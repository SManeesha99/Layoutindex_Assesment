import React, { useEffect } from 'react';
import axios from 'axios';


const AllDevice = () => {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [devices, setDevices] = React.useState([]);
    useEffect(()=>{
        const getAllDevices = async () => {
          await axios.get(`http://localhost:8090/api/device/devices`).then((res) => {
            setDevices(res.data.data);
          console.log( res.data)
          }).catch((err) => {
              console.log(err.massage);
          })
      }
        getAllDevices();
      },[])

    // const [searchTerm, setSearchTerm] = React.useState("");
    // const [devices, setDevices] = React.useState([]);
    // useEffect(() => {
    //     const getAllDevices = async () => {
    //         await axios.get(`http://localhost:8090/api/device/devices`).then((res) => {
    //             setDevices(res.data);
    //             console.log(res.data);
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     }
    //     getAllDevices();
    // },[]);
    

    const filteredDevices = devices.filter((devices) => {
        return (
            devices.serialNo.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            devices.type.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            devices.locationName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            devices.status.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    });

    const deleteDevice = async (DeviceId) => {
        try{
            const res = await axios.delete(`http://localhost:8090/api/device/delete/${DeviceId}`);
            alert(res.data.msg);
            console.log(res.data.msg);
        }catch(err){
            console.log(err.data.msg);
        }
    }

    

  return (
    <div className='container'>

        <h2 className="mb-4 pb-2 pb-md-0 mb-md-5">Devices List</h2>
            <br />
            <div className="container">
                <form class="form-inline my-2 my-lg-0">
                    <div className="row ">
                        <input class="form-control mr-sm-2 inputSearch" type="text" placeholder='Enter the location or device name ' onChange={(e) => setSearchTerm(e.target.value)} />&nbsp;
                        <a type="a" class="btn btn-primary inputSearch" href="/deviceAdd">add device</a>
                    </div>
                </form>
            </div>
            <br/>
            <div class="row row-cols-1 row-cols-md-4 g-5 " style={{ margin:'10px' }}>
                {filteredDevices.map((devices)=>
                    <div class="col">
                        <div class="card">
                        <img class="card-img-top" src={devices.photo} alt="Card image cap" />
                        <div class="card-body">
                            
                            <h5 class="card-title">Serial Number : {devices.serialNo}</h5>
                                <p class="card-text">Device Type : {devices.type}</p>
                                <p class="card-text">Location : {devices.locationName}</p>
                                <div className='col'>
                                    
                                        {devices.status === "active" ? (
                                            <div className="d-flex align-items-center">
                                            Status :  Active  <div className='badge bg-success me-2' style={{ display:"inline-block" , padding:"10px 10px"  , margin:"2px 3px 2px 10px", borderRadius:"20px" } } ></div>  
                                            </div>
                                        ) : (
                                            <div className="d-flex align-items-center">
                                            Status : Inactive <div className="badge bg-danger me-2" style={{ display:"inline-block" , padding:"10px 10px" , margin:"2px 3px 2px 10px", borderRadius:"20px" } }></div> 
                                            </div>
                                        )}
                                </div>
                                <div className='row mt-3'>
                                    <div className='btn-group'>
                                        {/* <a href={`/deviceEdit/${devices._id}`} class="btn btn-success">Edit</a>&nbsp; */}
                                        <button type="button" class="btn btn-danger" onClick={()=>deleteDevice(devices._id)}>Delete</button>
                                    </div>

                                </div>
                        </div>
                        </div>
                    </div>
                    
                )}
                
            </div>
            {/* <div className='row row-cols-1 row-cols-md-2 g-4'>
                {filteredDevices.map((devices) => (
                    <div className='col-md-3 mb-4 pb-4'>
                        <div class="card" style={{ width: "18rem" }}>
                            <img class="card-img-top" src={devices.photo} alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">{devices.serialNo}</h5>
                                <p class="card-text">{devices.type}</p>
                                <p class="card-text">{devices.locationName}</p>
                                <p class="card-text">{devices.status}</p>
                                <div className='row'>
                                    <div className='col-md-3 mb-4 pb-4'>
                                        <a href='#' class="btn btn-warning">Edit</a>&nbsp;

                                    </div>
                                    <div className='col-md-3 mb-4 pb-4'>
                                    </div>
                                    <div className='col-md-3 mb-4 pb-4'>
                                           <button type="button" class="btn btn-danger">Delete</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </div> */}



    </div>
  )
}


export default AllDevice