
interface  IShipment {
  
    provider: string,
    CurrentStatus: {
      state: string,
      timestamp: string
    },
    PromisedDate: string
    TrackingNumber: string,
    TrackingURL: string
    SupportPhoneNumbers: [
      string
    ],
    TransitEvents: [
      {
        state: string,
        timestamp: string
        hub? : string
      },
    ],
    CreateDate: string,
    isEditableShipment: Boolean,
    nextWorkingDay: [
      {
        dayDate: string,
        dayName: string
      }
    ]
} 

function ShipmentDetails(props: {shipment: IShipment|undefined, trackNumber: string|undefined}) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const weekDays = ['Sun', 'Mon', 'Thu', 'Wen', 'Thr', 'Fri', 'Sat'];
  
    function getDate(timestamp: string, format: string) {
        let date = new Date(timestamp);
        if (format === 'd/m/Y') {
          return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear(); 
        }
        if (format === 'Y month d') {
          return date.getFullYear() + ' ' + monthNames[date.getMonth()] + ' ' + date.getDate(); 
        }
        return ''; 
    }
    function getTime(timestamp: string) {
      let date = new Date(timestamp);
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    const listTransitEvents = () => {
      if (props.shipment) {
        return props.shipment.TransitEvents.map((event: IShipment["TransitEvents"][0], index) => 
        <tr key={index}>
          <td>{event.hub}</td>
          <td>{getDate(event.timestamp, 'd/m/Y')}</td>
          <td>{getTime(event.timestamp)}</td>
          <td>{event.state}</td>
        </tr>
      )
    }  
  }

  {
    if (props.shipment) {
    return (
    <div>      
      <div className="card mt-2">
          <div className='row'>
            <div className="card-body col-md-3">
              <h6 className="card-subtitle mb-2 text-muted">Tracking Number #{props.shipment.TrackingNumber}</h6>
              <h5 className="card-title">{props.shipment.CurrentStatus.state}</h5>
            </div>
            <div className="card-body col-md-3">
              <h6 className="card-subtitle mb-2 text-muted">Last Update</h6>
              <h5 className="card-title">{weekDays[(new Date(props.shipment.CurrentStatus.timestamp)).getDay()] + ' ' + getDate(props.shipment.CurrentStatus.timestamp, 'd/m/Y') + ' at ' + getTime(props.shipment.CurrentStatus.timestamp)}</h5>
            </div>
            <div className="card-body col-md-3">
              <h6 className="card-subtitle mb-2 text-muted">Provider</h6>
              <h5 className="card-title">{props.shipment.provider}</h5>
            </div>
            <div className="card-body col-md-3">
              <h6 className="card-subtitle mb-2 text-muted">Promised Date</h6>
              <h5 className="card-title">{getDate(props.shipment.PromisedDate, 'Y month d')}</h5>
            </div>
          </div>
        </div>
        <div className='mt-2'>
          <h4> Shipment Details</h4>
          <div className="table-responsive mt-2">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
              {listTransitEvents()}
              </tbody>
            </table>
          </div>
          
      </div>
    </div>
  );
    } else if(props.trackNumber) {
      return (
      <div className="alert alert-danger mt-2" role="alert">
        No props.Shipment with tracking number #{props.trackNumber}
      </div>
      )
    } else {
      return (
        <div className="alert alert-secondary mt-2" role="alert">
          Enter Track number to see its details
        </div>
      )
    }
  }
}

export default ShipmentDetails;
