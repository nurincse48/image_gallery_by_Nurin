import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import img1 from '../src/asserts/image-1.webp';
import img2 from '../src/asserts/image-2.webp';
import img3 from '../src/asserts/image-3.webp';
import img4 from '../src/asserts/image-4.webp';
import img5 from '../src/asserts/image-5.webp';
import img6 from '../src/asserts/image-6.webp';
import img7 from '../src/asserts/image-7.webp';
import img8 from '../src/asserts/image-8.webp';
import img9 from '../src/asserts/image-9.webp';
import img10 from '../src/asserts/image-10.jpeg';
import img11 from '../src/asserts/image-11.jpeg';

function App() {
   // image array list

   const [images, setImages] = useState([
    {
      url: img1,
      selected: false,
    },
    {
      url: img2,
      selected: false,
    },
    {
      url: img3,
      selected: false,
    },
    {
      url: img4,
      selected: false,
    },
    {
      url: img5,
      selected: false,
    },
    {
      url: img6,
      selected: false,
    },
    {
      url: img7,
      selected: false,
    },
    {
      url: img8,
      selected: false,
    },
    {
      url: img9,
      selected: false,
    },

    {
      url: img10,
      selected: false,
    },
    {
      url: img11,
      selected: false,
    },
   
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(-1);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  // -- necessary method for drag & drop feature
  const startDrag = (index, event) => {
    setDragIndex(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text", index);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (index, event) => {
    event.preventDefault();
    const movedImageIndex = event.dataTransfer.getData("text");
    if (movedImageIndex !== "") {
      const fromIndex = parseInt(movedImageIndex);
      const toIndex = index;

      // Rearrange the images array
      const movedImage = images[fromIndex];
      const updatedImages = [...images];
      updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);
      setImages(updatedImages);
    }
    setDragIndex(-1);
  };
   // -- necessary method for multiple images deletion and selected image counting
  const toggleSelect = (index) => {
    const updatedImages = [...images];
    updatedImages[index].selected = !updatedImages[index].selected;
    setImages(updatedImages);
  
    const count = updatedImages.filter((image) => image.selected).length;
    setSelectedCount(count);
  };
  const deleteSelected = () => {
    const updatedImages = images.filter((image) => !image.selected);
    setImages(updatedImages);
    const count = updatedImages.filter((image) => image.selected).length;
    setSelectedCount(count);
  };
  
  return (
    <div className="App">

      <div className="container">
        <div className="card">
          <div className="card-header">
                  {selectedCount === 0 ? (
                    <h3>Gallery</h3>
                  ) : (
                    <div className="row">
                      <div className="selected-count col-md-6">
                      <div className="checkbox">
                       <span>&#10004;</span>
                      </div>
                        Selected: {selectedCount} images
                      </div>
                      <a className="delete-link col-md-6" style={{ textAlign: 'right' }} onClick={deleteSelected}>
                        Delete Selected
                      </a>
                    </div>
                  )}
          </div>
          <div className="card-body">
          <div className="image-container">
            {images.map((image, index) => (
                  <div
                  className={`image ${image.selected ? 'selected' : ''} ${index < 1 ? 'large' : ''}`}
                  onDragOver={(event) => onDragOver(event)}
                  onDrop={(event) => onDrop(index, event)}
                  key={index}
                  onClick={() => toggleSelect(index)} 
                  >
                  <div className="card" draggable="true" onDragStart={(event) => startDrag(index, event)}>
                  {image.url && (
                    <>
                      {image.selected && <div className="overlay" />}
                      <div className="checkbox">
                        {image.selected && <span>&#10004;</span>}
                      </div>
                      <img src={image.url} alt="Image" />
                    </>
                  )}
                
          </div>
        </div>
                  ))}
              {/* Add the blank card with text "Add New Image" */}
              <div className="image add-image-card" style={{ backgroundColor: 'white', textAlign: 'center', cursor: 'pointer' }}>
                <div className="add-new-image-text mt-2">
                    <FontAwesomeIcon icon={faImages} size="1.5x" /> {/* You can adjust the size */}
                    <div>Add Images</div>
                </div>     
              </div>      
          </div>
          </div>
        </div>
  </div>

</div>
       
  
    
  );
}

export default App;
