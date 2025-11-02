
import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities data:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title text-primary">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <td>{activity.name || '-'}</td>
                  <td>{activity.description || '-'}</td>
                  <td>{activity.type || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Example Bootstrap Modal (scaffold) */}
        <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#activityModal">
          Add Activity
        </button>
        <div className="modal fade" id="activityModal" tabIndex="-1" aria-labelledby="activityModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="activityModalLabel">Add Activity</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="activityName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="activityName" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="activityDesc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="activityDesc" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="activityType" className="form-label">Type</label>
                    <input type="text" className="form-control" id="activityType" />
                  </div>
                  <button type="submit" className="btn btn-success">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Activities;
