// import React, { useEffect } from 'react'
// import axios from 'axios';
// import Select from "react-select";
// import { useParams } from 'react-router-dom';

// const EditDevice = () => {

//     const [locations, setLocations] = React.useState([]);
//     const params=useParams();
//     const deviceID=params.id;
//     console.log(deviceID)

    
//     const [devicePlayLoad, setDevicePlayLoad] = React.useState({
//         serialNo: "",
//         type: "",
//         photo:"",
//         locationName: "",
//         status: "",
//         locationId: "",
//       });

//       const{serialNo,type,photo,locationName,status}=devicePlayLoad

//       const [editDevicePlayLoad, setEditDevicePlayLoad] = React.useState({
//         serialN0: "",
//         type: "",
//         photo:"",
//         locationName: "",
//         status: "",
//         locationId: "",
//       });
      
//     const onChangeInput = (e) => {
//         setEditDevicePlayLoad({
//         ...editDevicePlayLoad,
//         [e.target.id]: e.target.value,
//       });
//     };      

//     const onLocationId =  (e) => {
//         console.log("🚀 ~ file: AddDevice.js:27 ~ onLocationId ~ e:", e)
//         let combinedValues = e.target.value;
//          let valuesArray = combinedValues.split("|");
//          console.log("🚀 ~ file: AddDevice.js:29 ~ onLocationId ~ valuesArray:", valuesArray[0])
//          setEditDevicePlayLoad({
//            ...editDevicePlayLoad,
//            locationId:valuesArray[0],
//            locationName:valuesArray[1],
//          });
     
//      };
      
//     const getOneDevice = async () => {
//         await axios.get(`http://localhost:8090/api/device/device/${deviceID}`).then((res) => {
//             console.log(res.data);
//             setDevicePlayLoad(res.data.data);
//         }).catch((err) => {
//             console.log(err.massage);
//         })
//     }

//     const getAllLocations = async () => {
//           await axios.get(`http://localhost:8090/api/location/locations`).then((res) => {
//               console.log(res.data);
//               setLocations(res.data.data);
//           }).catch((err) => {
//               console.log(err.massage);
//           })
//     }

//     useEffect(()=>{
//         getAllLocations();
//         getOneDevice()
//     },[])

//     const onSubmit = async (e) => {
//         console.log(devicePlayLoad)
//       e.preventDefault();
//       try{
//         const res = await axios.put(`http://localhost:8090/api/device/update/${deviceID}`);
//         console.log(res.data)
//         alert("Device updated successfully");
//         window.location.href = "/";

//       }catch(err){
//         console.log(err)
//       }
//     };
      
//     const handleImageChange = async e => {
//         e.preventDefault()
//         try {
//             const file = e.target.files[0]
    
//             if (!file) return alert("File not exist.")
    
//             if (file.size > 1024 * 1024) // 1mb
//                 return alert("Size too large!")
    
//             if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
//                 return alert("File format is incorrect.")
    
//             let formData = new FormData()
//             formData.append('file', file)
//             formData.append('upload_preset', 'surge-assesment')
//             formData.append('cloud_name', 'drao60sj6')
    
//             // setLoading(true)
//             const res = await axios.post( "https://api.cloudinary.com/v1_1/drao60sj6/image/upload",
//             formData,
//             {
//               method: "post",
//               body: formData,
//               headers: {
//                 "content-type": "multipart/form-data",
//               },
//             })
//             // setLoading(false)
//             setDevicePlayLoad({
//               ...devicePlayLoad,
//               photo: res.data.url,
//             });
//             alert(res.data.message);
//           } catch (err) {
//             console.log(err.response.data.msg);
            
//           }
//    }

//    const options = [
//     { value: "pos", label: "POS" },
//     { value: "kisok", label: "Kisok" },
//     { value: "signage", label: "signage" },
//   ];
  
  
//     return (
//     <div className='container-sm'>
//       <section className="vh-100 gradient-custom">
//         <div className="container py-5 h-100">
//           <div className="row justify-content-center align-items-center h-100">
//             <div className="col-12 col-lg-9 col-xl-7">
//               <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
//                 <div className="card-body p-4 p-md-5">
//                   <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add Device</h3>
//                   <form>
//                       <div class="mb-3">
//                           <label class="form-label">Serial Number</label>
//                           <input type="text" class="form-control" id='serialNo' defaultValue={serialNo}  onChange={(e)=>onChangeInput}/>
//                       </div>
//                       <div class="mb-3">
//                           <label class="form-label">Select Device Type</label>
//                           <select class="form-select" aria-label="Default select example" name='type' id='type' onChange={(e)=>onChangeInput}>
//                               <option selected disabled>{type}</option>
//                               {options.map((options) => (
//                                 <option value={options.value}>{options.label}</option>
//                               ))}
//                           </select>
//                           {/* <Select  className="" defaultValue={type} 
//                                 options={[
//                                     { value: "pos", label: "POS" },
//                                     { value: "kiosk", label: "kiosk" },
//                                     { value: "signage", label: "signage" },
//                                 ]}
//                             /> */}
//                       </div>  
//                       <div class="mb-3">
//                           <label class="form-label">Select Location</label>
//                           <select class="form-select"  name="locationName" onChange={(e)=>onChangeInput}>
//                               <option selected disabled>{locationName}</option>
//                               {locations.map((location,index) => (
//                                 <option value={location._id+"|"+location.name} >{location.name}</option>
//                               ))}
//                           </select>
//                       </div>            
//                       <div class="mb-3">
//                           <label for="formFile" class="form-label">Device Image</label>
//                         <div class="card" style={{ width:'18rem' }}>
//                             <img class="card-img-top" src={photo} alt="Card image cap" />
//                             <div class="card-body">
//                             </div>
//                         </div>
//                         <label for="formFile" class="form-label">Change Device Image</label>
//                           <input class="form-control" type="file" id="formFile" name='photo' onChange={(e)=>onChangeInput}/>
//                       </div>
//                       <div class="mb-3">
//                           <label for="formFile" class="form-label">Status</label>
//                           <div className="row ">
//                                 <div >
//                                 <select class="form-select"  name="status" id='status' onChange={(e)=>onChangeInput}>
//                                     <option selected>{status}</option>
//                                     <option value="inactive">Inactive</option>
//                                 </select>

//                                 </div>
//                               </div>
//                       </div>
//                       <button type="submit" class="btn btn-primary" onClick={(e)=> onSubmit(e)}>Submit</button>
//                   </form>
//                 </div>
//               </div>  
//             </div>
//           </div>
//         </div>
//       </section>      
       
//     </div>
//   )
// }

// export default EditDevice
