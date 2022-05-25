import { React, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';
import vtkSTLReader from '@kitware/vtk.js/IO/Geometry/STLReader';
import Form from 'react-bootstrap/Form';


const VtkContainer = styled.div`
  height: calc(100vh - 56px);
  width: 100%;
  overflow: hidden;
`;


const ControlsContainer = styled.div`
  position: absolute;
  top: 81px;
  left: 25px;
  background: white;
  padding: 12px;
`;


const GraphicsWindow = () => {
  const fileInputRef = useRef(null);
  const coneResolutionInputRef = useRef(null);
  const context = useRef(null);
  const vtkContainerRef = useRef(null);
  const [coneResolution, setConeResolution] = useState(12);
  const [representation, setRepresentation] = useState(2);

  useEffect(() => {
    if (!context.current) {
      // Standard rendering code setup
      const reader = vtkSTLReader.newInstance();
      const renderWindow = vtkRenderWindow.newInstance();
      const renderer = vtkRenderer.newInstance({ background: [0.9, 0.9, 0.9] });
      renderWindow.addRenderer(renderer);

      // Simple pipeline ConeSource --> Mapper --> Actor
      const coneSource = vtkConeSource.newInstance({ height: 1.0 });

      const mapper = vtkMapper.newInstance();
      mapper.setInputConnection(coneSource.getOutputPort());

      const actor = vtkActor.newInstance();
      actor.setMapper(mapper);
      actor.getProperty().setColor(0, 1, 0);

      // Add the actor to the renderer and set the camera based on it
      renderer.addActor(actor);
      renderer.resetCamera();
      const camera = renderer.getActiveCamera();
      // camera.pitch(90);

      // Use OpenGL as the backend to view the all this
      const container = vtkContainerRef.current;
      const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
      renderWindow.addView(openglRenderWindow);
      openglRenderWindow.setContainer(container);

      // Capture size of the container and set it to the renderWindow
      const { width, height } = container.getBoundingClientRect();
      openglRenderWindow.setSize(width, height);

      // Setup an interactor to handle mouse events
      const interactor = vtkRenderWindowInteractor.newInstance();
      interactor.setView(openglRenderWindow);
      interactor.initialize();
      interactor.bindEvents(container);

      // Setup interactor style to use
      interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());

      renderWindow.render();

      context.current = {
        actor,
        camera,
        coneSource,
        container,
        mapper,
        openglRenderWindow,
        reader,
        renderer,
        renderWindow,
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

  function handleFileInputChange(event) {
    event.preventDefault();
    if (context.current) {
      const { mapper, reader, renderer, renderWindow } = context.current;
      const dataTransfer = event.dataTransfer;
      const files = fileInputRef.current.files || dataTransfer.files;
      if (files.length === 1) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          reader.parseAsArrayBuffer(fileReader.result);
          mapper.setInputConnection(reader.getOutputPort());
          renderer.resetCamera();
          renderWindow.render();
          // Disable the cone resolution input
          coneResolutionInputRef.current 
            && coneResolutionInputRef.current.setAttribute('disabled', '');
        };
        fileReader.readAsArrayBuffer(files[0]);
      }
    }
  }

  return (
    <div id="graphics-renderWindow-wrapper">
      <VtkContainer id="vtk-container" ref={vtkContainerRef} />
      <ControlsContainer className="rounded shadow">
        <Form.Group className="mb-2">
          <Form.Label>Representation</Form.Label>
          <Form.Select 
            value={representation}
            onInput={(ev) => setRepresentation(Number(ev.target.value))}
            aria-label="Representation select box.">
            <option value="0">Points</option>
            <option value="1">Wireframe</option>
            <option value="2">Surface</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Cone Resolution</Form.Label>
          <Form.Range
            min="4"
            max="80"
            value={coneResolution}
            onChange={(ev) => setConeResolution(Number(ev.target.value))}
            ref={coneResolutionInputRef}  
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Load STL File</Form.Label>
          <Form.Control 
            type="file"
            accept=".stl"
            onChange={handleFileInputChange}
            ref={fileInputRef}
          />
        </Form.Group>
      </ControlsContainer>
    </div>
  );
};

export default GraphicsWindow;