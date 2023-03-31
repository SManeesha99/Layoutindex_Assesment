import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LocationList = () => {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [locations, setLocations] = React.useState([]);
    console.log("🚀 ~ file: ListLocation.js:9 ~ ListLocation ~ locations:", locations)
    const navigate = useNavigate();

    useEffect(() => {
        const getAllLocations = async () => {
            await axios.get(`http://localhost:8090/api/location/locations`).then((res) => {
                setLocations(res.data.data);
                console.log(res.data);
            }).catch((err) => {
                console.log(err.massage);
            })
        }
        getAllLocations();
    }, [])

    const filteredLocations = locations.filter((locations) => {
        return (
            locations.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            locations.address.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            locations.phone.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    });

    // const onClickEdite = (EID) => {
    //     console.log(EID)
    //     navigate(`/location/edite/${EID}`)
    // };
    const onClickAddLocation = (e) => {
        navigate('/locationAdd')

    };
    

  return (
    <div>

        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Location List</h3>

        <div className="container">
            <form class="form-inline my-2 my-lg-0">
                <div className="row ">
                    <input class="form-control mr-sm-2 inputSearch" type="text" placeholder='Enter the location' onChange={(e) => setSearchTerm(e.target.value)} />&nbsp;
                    <button type="button" class="btn btn-primary inputSearch" onClick={(e) => onClickAddLocation()}>Add Location</button>
                </div>
            </form>
        </div>
        <div className='table-div'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Location Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Devices</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLocations.map((location) => (
                        <tr>

                            <th scope="row">{location._id}</th>
                            <td>{location.name}</td>
                            <td>{location.address}</td>
                            <td>{location.phone}</td>
                            <td>
                                {location.devices.map((index) => (
                                    <p>{index},</p>
                                ))}
                            </td>
                            <td>
                                <button type="button" class="btn btn-warning" >Edit</button> &nbsp;
                                {/* <button type="button" class="btn btn-danger"onClick={() => deleteLocation(location._id)}>Delete</button> */}

                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>


    </div>
  )
}


export default LocationList