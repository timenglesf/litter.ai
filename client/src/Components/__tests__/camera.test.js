/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';
import {
  act,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import * as fetchUserData from '../../utils/fetchUserData';
import AddImage from '../Camera/AddImage';
import ImageUploaded from '../Camera/ImageUploaded';
import CameraCapture from '../Camera/CameraCapture';

// SetState function and mock uploaded image
const setImageMock = jest.fn();
const mockFile = new File(['cameraTest'], 'cameraTest.png', { type: 'image/png' });

describe('AddImage component', () => {
  // Function to simulate an setState function
  const addImage = <Router><AddImage setImage={setImageMock} /></Router>;

  // Mock window.URL.createObjectURL in Jest
  window.URL.createObjectURL = jest.fn();
  afterEach(() => { window.URL.createObjectURL.mockReset(); });

  // Creates a snapshot
  test('AddImage matches the current snapshot', () => {
    const tree = renderer.create(addImage).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Uploaded image is saved as a state', async () => {
    render(
      <Router>
        <AddImage setImage={setImageMock} />
        <ImageUploaded image={mockFile} setImage={setImageMock} />
      </Router>,
    );

    // Checking if it is on the camera capture page
    expect(screen.getByText('Take a photo of the item')).toBeInTheDocument();

    // Mocks uploading an image file
    fireEvent.click(screen.getByTestId('camera-plus'));
    const fileUpload = screen.getByTestId('camera-input');
    await userEvent.upload(fileUpload, mockFile);

    // Checks if the image has been uploaded, state has changed, and submit button is visible
    expect(screen.getByTestId('image-preview')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(setImageMock).toHaveBeenCalled();
  });
});

describe('ImageUploaded component', () => {
  const imageUpload = (
    <Router>
      <ImageUploaded image={mockFile} setImage={setImageMock} />
    </Router>
  );
  const mockImageData = { class: 'plastic', confidence: 0.4749128520488739 };
  const mockCall = async (data) => {
    await jest.spyOn(fetchUserData, 'fetchImageToAI').mockResolvedValue(data);
  };

  beforeEach(() => { mockCall(mockImageData); });
  afterEach(() => { jest.restoreAllMocks(); });

  test('Clicking on X removes the image', async () => {
    render(imageUpload);
    await fireEvent.click(screen.getByRole('button', { name: /image-x-button/i }));
    expect(setImageMock).toHaveBeenCalled();
  });

  test('Clicking on submit sends the image to the AI', async () => {
    render(imageUpload);
    await act(() => fireEvent.click(screen.getByRole('button', { name: /Submit/i })));
    expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument();
  });
});
