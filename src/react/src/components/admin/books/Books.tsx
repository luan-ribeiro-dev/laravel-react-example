import React, { useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { RootState } from '../../../api/store/type';
import { APIConstants } from '../../../api';
import { Link } from 'react-router-dom';
import Footer from '../../shared/Footer';
import Navbar from '../../shared/Navbar';
import AdminPanel from '../AdminPanel';
import { getBooks } from '../../../api/requests/admin/books';

function mapStateToProps(state: RootState) {
  return {
    getBooksState: state.admin.books.getBooks
  }
}

const mapDispatchToProps = {dispatchGetBooks: getBooks}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function Books({getBooksState, dispatchGetBooks}: Props) {

  useEffect(() => {
    if (getBooksState.status === APIConstants.UNSTARTED) {
      dispatchGetBooks()
    }
  }, [getBooksState.status])

  console.log(getBooksState)

  return (
    <AdminPanel
      breadcrumb={[
        {name: "Books", link: "books"}
      ]}
      title="Book list"
    >
      <div className="row">
        <div className="col-12 mb-md-0">
          <div className="card">
            <div className="card-header pb-0 pt-3">
              <div className="row">
                <div className="col-lg-6 col-7">
                  <h6>Books</h6>
                </div>
                <div className="col-6 text-end">
                  <Link to="/books/new">
                    <button className="btn btn-primary btn-sm mb-0">
                      <i className="fa fa-plus me-2"></i> 
                      <span className="pt-1">Add new book</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Author</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ISBN</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Genre</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Stock</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {getBooksState.status === APIConstants.SUCCEEDED} */}
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="../assets/img/small-logos/logo-xd.svg" className="avatar avatar-sm me-3" alt="xd" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Soft UI XD Version</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                            <img src="../assets/img/team-1.jpg" alt="team1" />
                          </a>
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                            <img src="../assets/img/team-2.jpg" alt="team2" />
                          </a>
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                            <img src="../assets/img/team-3.jpg" alt="team3" />
                          </a>
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="../assets/img/team-4.jpg" alt="team4" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> 10.000 </span>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $14,000 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">60%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-info w-60" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="../assets/img/small-logos/logo-atlassian.svg" className="avatar avatar-sm me-3" alt="atlassian" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Add Progress Track</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                            <img src="../assets/img/team-2.jpg" alt="team5" />
                          </a>
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="../assets/img/team-4.jpg" alt="team6" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> 10.000 </span>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $3,000 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">10%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-info w-10" role="progressbar" aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="../assets/img/small-logos/logo-slack.svg" className="avatar avatar-sm me-3" alt="team7" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Fix Platform Errors</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                            <img src="../assets/img/team-3.jpg" alt="team8" />
                          </a>
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="../assets/img/team-1.jpg" alt="team9" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> 10.000 </span>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> Not set </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">100%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm me-3" alt="spotify" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Launch our Mobile App</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                            <img src="../assets/img/team-4.jpg" alt="user1" />
                          </a>
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                            <img src="../assets/img/team-3.jpg" alt="user2" />
                          </a>
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                            <img src="../assets/img/team-4.jpg" alt="user3" />
                          </a>
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="../assets/img/team-1.jpg" alt="user4" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> 10.000 </span>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $20,500 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">100%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="../assets/img/small-logos/logo-jira.svg" className="avatar avatar-sm me-3" alt="jira" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Add the New Pricing Page</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                            <img src="../assets/img/team-4.jpg" alt="user5" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> 10.000 </span>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $500 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">25%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-info w-25" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={25}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="../assets/img/small-logos/logo-invision.svg" className="avatar avatar-sm me-3" alt="invision" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Redesign New Online Shop</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                            <img src="../assets/img/team-1.jpg" alt="user6" />
                          </a>
                          <a className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="../assets/img/team-4.jpg" alt="user7" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> 10.000 </span>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $2,000 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">40%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-info w-40" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={40}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPanel>
  )
}

export default connector(Books)
