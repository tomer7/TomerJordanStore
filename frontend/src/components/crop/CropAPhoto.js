import React from 'react'
import Cropper from 'react-easy-crop'

class CropAPhoto extends React.Component {
   state = {
      imageSrc: '',
      crop: { x: 0, y: 0 },
      cropSize: { width: 400, height: 400 },
      zoom: 0.1,
      aspect: 1
   }

   onCropChange = (crop) => {
      this.setState({ crop })
   }

   onZoomChange = (zoom) => {
      this.setState({ zoom })
   }

   render() {
      return (
         <div className='PictureFramer'>
            <div className='PictureFramer__inner'>
               <div
                  style={{
                     position: 'relative',
                     width: '400px',
                     height: '400px',
                     background: '#000'
                  }}
               >
                  {(this.state.imageSrc = this.props.imageUrl)}
                  <Cropper
                     image={this.state.imageSrc}
                     crop={this.state.crop}
                     zoom={this.state.zoom}
                     aspect={this.state.aspect}
                     cropShape='round'
                     cropSize={this.state.cropSize}
                     showGrid={false}
                     onCropChange={this.onCropChange}
                     onZoomChange={this.onZoomChange}
                     restrictPosition={true}
                  />
               </div>
               <input
                  type='range'
                  min='1'
                  max='3'
                  step='any'
                  value={this.state.zoom}
                  onChange={(e) => this.onZoomChange(e.target.value)}
                  style={{ padding: '22px 0px' }}
               />
               <button>submit photo</button>
            </div>
         </div>
      )
   }
}

export default CropAPhoto
