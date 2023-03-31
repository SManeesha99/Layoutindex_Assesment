import React from 'react'
import axios from 'axios';

const AddDevice = () => {

    

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
                          <input type="text" class="form-control" />
                      </div>
                      <div class="mb-3">
                          <label class="form-label">Select Device Type</label>
                          <select class="form-select" aria-label="Default select example">
                              <option selected disabled>Select Device</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                          </select>
                      </div>  
                      <div class="mb-3">
                          <label class="form-label">Select Location</label>
                          <select class="form-select" aria-label="Default select example">
                              <option selected disabled>Select Location</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                          </select>
                      </div>            
                      <div class="mb-3">
                          <label for="formFile" class="form-label">Device Image</label>
                          <input class="form-control" type="file" id="formFile"/>
                      </div>
                      <div class="mb-3">
                          <label for="formFile" class="form-label">Status</label>
                          <div className="row ">
                                <div >


                                  <input
                                    selected
                                    type="radio"
                                    id="status"
                                    value="active"
                                    name="status"
                                  />&nbsp; Active

                                </div>

                                <div >


                                  <input
                                    type="radio"
                                    id="status"
                                    value="inactive"
                                    name="status"
                                  /> &nbsp; Inactive
                                </div>
                              </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
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