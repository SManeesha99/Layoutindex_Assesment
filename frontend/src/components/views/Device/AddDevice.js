import React, { useEffect } from 'react'
import axios from 'axios';
import Select from "react-select";

const AddDevice = () => {
    
    const [photo, setPhoto] = React.useState("");
    const [locations, setLocations] = React.useState([]);
    const [locationArray, setLocationArray] = React.useState([]);
    const [type, setType] = React.useState("");
    const [devicePalyload, setDevicePalyload] = React.useState({
        serialNo: "",
        type: "",
        locationName: "",
        photo: "",
        status: "",
        locationId: "",
    });



    
    const onChangeInput = (e) => {
      setDevicePalyload({
        ...devicePalyload,
        [e.target.id]: e.target.value,
        type:type,
      });
    };
    

    const onLocationId =  (e) => {
      let combinedValues = e.target.value;
       let valuesArray = combinedValues.split("|");
       setDevicePalyload({
         ...devicePalyload,
         locationId:valuesArray[0],
         locationName:valuesArray[1],
       });
   
   };

     useEffect(()=>{
      const getAllLocations = async () => {
        await axios.get(`http://localhost:8090/api/location/locations`).then((res) => {
            console.log(res.data);
            setLocations(res.data.data);
        }).catch((err) => {
            console.log(err.massage);
        })
    }
      getAllLocations();
    },[])


    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(devicePalyload)
        const res = await axios.post("http://localhost:8090/api/device/add",devicePalyload);
        console.log(res);
        alert("Device added successfully");

        window.location.href = "/";
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    const options = [
      { value: "pos", label: "POS" },
      { value: "kiosk", label: "kiosk" },
      { value: "signage", label: "signage" },
    ];
    
    const handleImageChange = async e => {
      // const data = new FormData()
      //   data.append("file", photo)
      //   data.append("upload_preset","surge-assesment")
      //   data.append("cloud_name","drao60sj6")
      //   fetch("https://api.cloudinary.com/v1_1/drao60sj6/image/upload",{
      //       method:"post",
      //       body:data
      //   })
      //   .then(res=>res.json())
      //   .then(data=>{
      //       setUrl(data.url)
      //   }) 
      //   .catch(err=>{
      //       console.log(err)
      //  })
      e.preventDefault()
      try {
          const file = e.target.files[0]
  
          if (!file) return alert("File not exist.")
  
          if (file.size > 1024 * 1024) // 1mb
              return alert("Size too large!")
  
          if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
              return alert("File format is incorrect.")
  
          let formData = new FormData()
          formData.append('file', file)
          formData.append('upload_preset', 'surge-assesment')
          formData.append('cloud_name', 'drao60sj6')
  
          // setLoading(true)
          const res = await axios.post( "https://api.cloudinary.com/v1_1/drao60sj6/image/upload",
          formData,
          {
            method: "post",
            body: formData,
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          // setLoading(false)
          setDevicePalyload({
            ...devicePalyload,
            photo: res.data.url,
          });
          alert(res.data.message);
        } catch (err) {
          console.log(err.response.data.msg);
          
        }
 }

    

  return (
    <div className='container-sm'>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add Device</h3>
                  <form>
                      <div class="mb-3">
                          <label class="form-label">Serial Number</label>
                          <input type="text" class="form-control" id='serialNo' onChange={(e) => onChangeInput(e)}/>
                      </div>
                      <div class="mb-3">
                          <label class="form-label">Select Device Type</label>
                          {/* <select class="form-select" aria-label="Default select example" onChange={(e) => onChangeInput(e)}>
                              <option selected disabled>Select Device</option>
                              {options.map((options) => (
                                <option value={options.value}>{options.label}</option>
                              ))}
                          </select> */}
                          <Select
                  className=""
                  options={[
                    { value: "pos", label: "POS" },
      { value: "kiosk", label: "kiosk" },
      { value: "signage", label: "signage" },
                  ]}
                  onChange={(e) => {
                    setType(e.value);
                  }}
                  />
                      </div>  
                      <div class="mb-3">
                          <label class="form-label">Select Location</label>
                          <select class="form-select"  name="locationName" onChange={(e) => onLocationId(e)}>
                              <option selected disabled>Select Location</option>
                              {locations.map((location,index) => (
                                <option value={location._id+"|"+location.name} >{location.name}</option>
                              ))}
                          </select>
                      </div>            
                      <div class="mb-3">
                          <label for="formFile" class="form-label">Device Image</label>
                          <input class="form-control" type="file" id="formFile" name='photo' onChange={handleImageChange}/>
                      </div>
                      <div class="mb-3">
                          <label for="formFile" class="form-label">Status</label>
                          <div className="row ">
                                <div >


                                  <input
                                  id='status'
                                    type="radio"
                                    value="active"
                                    name="status"
                                    onChange={(e) => onChangeInput(e)}
                                  />&nbsp; Active

                                </div>

                                <div >


                                  <input
                                  id='status'
                                    type="radio"
                                    value="inactive"
                                    name="status"
                                    onChange={(e) => onChangeInput(e)}
                                  /> &nbsp; Inactive
                                </div>
                              </div>
                      </div>
                      <button type="submit" class="btn btn-primary" onClick={(e)=> onSubmit(e)}>Submit</button>
                  </form>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </section>      
       
    </div>
  )
}


export default AddDevice