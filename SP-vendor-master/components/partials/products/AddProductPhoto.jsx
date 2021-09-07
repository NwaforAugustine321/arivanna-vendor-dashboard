import { useRef, useState } from "react";

const AddProductPhoto = (props) => {
  const imageRef = useRef();
  const [productPhotoList, setProductPhotoList] = useState([{ photo: "" }]);
  const [selectedFiles, storeFiles] = useState([]);

  const handleChange = (e, index) => {
    let filesObj = [...e.target.files];

    for (let index = 0; index < filesObj.length; index++) {
      const reader = new FileReader();
      let base64ImageFormat = "";

      reader.onloadend = () => {
        base64ImageFormat = reader.result;
        selectedFiles.push({
          name: filesObj[index].name + index,
          imageData: base64ImageFormat,
        });
        storeFiles([...selectedFiles]);
      };
      reader.readAsDataURL(filesObj[index]);
    }
    props.handlePhotoList(selectedFiles);
  };
  const handleAddPhoto = (e) => {
    e.preventDefault();
    setProductPhotoList([...productPhotoList, { photo: "" }]);
  };

  const openFileExplorer = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };
  const removeImage = (imageName) => {
    const updateFiles = selectedFiles.filter(
      (_data) => _data.name !== imageName
    );
    storeFiles(updateFiles);
    props.handlePhotoList(updateFiles);
  };
  return (
    <>
      <div className="form-group">
        <label>Product Gallery</label>
        {selectedFiles.map((_data) => {
          return (
            <div key={_data.name}>
              <img src={_data.imageData} alt={_data.name} />
              <button
                className="ps-btn ps-btn--sm mb-5"
                htmlFor="selectFile"
                onClick={() => removeImage(_data.name)}
              >
                Remove Image
              </button>
            </div>
          );
        })}
        {productPhotoList.map((productPhoto, index) => {
          return (
            <>
              <div key={productPhoto} className="form-group--nest">
                <input
                  className="form-control mb-1"
                  type="text"
                  placeholder=""
                  value={`${selectedFiles.length} file/s selected`}
                  onChange={(e) => handleChange(e, index)}
                  disabled
                />
                <input
                  className="form-control mb-1"
                  type="file"
                  placeholder=""
                  value={productPhoto.photo}
                  onChange={(e) => handleChange(e, index)}
                  style={{ display: "none" }}
                  id="selectFile"
                  multiple
                  ref={imageRef}
                  accept="image/*"
                />
                {/* <label className="ps-btn ps-btn--sm" htmlFor="selectFile">
                  Choose
                </label> */}
                <button
                  className="ps-btn ps-btn--sm"
                  htmlFor="selectFile"
                  onClick={openFileExplorer}
                >
                  Choose
                </button>
              </div>

              {/* <div className="form-group form-group--nest"></div> */}
            </>
          );
        })}
        {/* <button className="ps-btn ps-btn--md" onClick={handleAddPhoto}>
          Add an image
        </button> */}
      </div>
    </>
  );
};

export default AddProductPhoto;
