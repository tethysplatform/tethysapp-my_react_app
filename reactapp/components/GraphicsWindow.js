import { React, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';


const VtkContainer = styled.div`
    height: calc(100vh - 56px);
    width: 100%;
    overflow: hidden;
`;


const GraphicsWindow = ({ tethysApp }) => {
  const vtkContainerRef = useRef(null);
  const context = useRef(null);
  const [coneResolution, setConeResolution] = useState(12);
  const [representation, setRepresentation] = useState(2);

  useEffect(() => {
    if (!context.current) {

      // ----------------------------------------------------------------------------
      // Standard rendering code setup
      // ----------------------------------------------------------------------------
      const renderWindow = vtkRenderWindow.newInstance();
      const renderer = vtkRenderer.newInstance({ background: [0.2, 0.3, 0.4] });
      renderWindow.addRenderer(renderer);

      // ----------------------------------------------------------------------------
      // Simple pipeline ConeSource --> Mapper --> Actor
      // ----------------------------------------------------------------------------
      const coneSource = vtkConeSource.newInstance({ height: 1.0 });

      const mapper = vtkMapper.newInstance();
      mapper.setInputConnection(coneSource.getOutputPort());

      const actor = vtkActor.newInstance();
      actor.setMapper(mapper);

      // ----------------------------------------------------------------------------
      // Add the actor to the renderer and set the camera based on it
      // ----------------------------------------------------------------------------
      renderer.addActor(actor);
      renderer.resetCamera();

      // ----------------------------------------------------------------------------
      // Use OpenGL as the backend to view the all this
      // ----------------------------------------------------------------------------
      const container = vtkContainerRef.current;
      const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
      renderWindow.addView(openglRenderWindow);
      openglRenderWindow.setContainer(container);

      // ----------------------------------------------------------------------------
      // Capture size of the container and set it to the renderWindow
      // ----------------------------------------------------------------------------
      const { width, height } = container.getBoundingClientRect();
      openglRenderWindow.setSize(width, height);

      // ----------------------------------------------------------------------------
      // Setup an interactor to handle mouse events
      // ----------------------------------------------------------------------------
      const interactor = vtkRenderWindowInteractor.newInstance();
      interactor.setView(openglRenderWindow);
      interactor.initialize();
      interactor.bindEvents(container);

      // ----------------------------------------------------------------------------
      // Setup interactor style to use
      // ----------------------------------------------------------------------------
      interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());

      renderWindow.render();

      context.current = {
        container,
        renderWindow,
        renderer,
        openglRenderWindow,
        coneSource,
        actor,
        mapper,
      };
    }

    return function cleanup() {
      if (context.current) {
        const { renderWindow, coneSource, actor, mapper } = context.current;
        actor.delete();
        mapper.delete();
        coneSource.delete();
        renderWindow.delete();
        context.current = null;
      }
    };
  }, [vtkContainerRef]);

  useEffect(() => {
    if (context.current) {
      const { coneSource, renderWindow } = context.current;
      coneSource.setResolution(coneResolution);
      renderWindow.render();
    }
  }, [coneResolution]);

  useEffect(() => {
    if (context.current) {
      const { actor, renderWindow } = context.current;
      actor.getProperty().setRepresentation(representation);
      renderWindow.render();
    }
  }, [representation]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (context.current) {
        const { container, openglRenderWindow, renderWindow } = context.current;
        const { width, height } = container.getBoundingClientRect();
        openglRenderWindow.setSize(width, height);
        renderWindow.render();
      }
    });
  });

  return (
    <div id="graphics-renderWindow-wrapper">
      <VtkContainer id="vtk-container" ref={vtkContainerRef} />
      <table
        style={{
          position: 'absolute',
          bottom: '25px',
          left: '25px',
          background: 'white',
          padding: '12px',
        }}
      >
        <tbody>
          <tr>
            <td>
              <select
                value={representation}
                style={{ width: '100%' }}
                onInput={(ev) => setRepresentation(Number(ev.target.value))}
              >
                <option value="0">Points</option>
                <option value="1">Wireframe</option>
                <option value="2">Surface</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="range"
                min="4"
                max="80"
                value={coneResolution}
                onChange={(ev) => setConeResolution(Number(ev.target.value))}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GraphicsWindow;