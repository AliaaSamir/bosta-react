import axios from 'axios';
import React, { useState } from 'react';
import ShipmentDetails from './ShipmentDetails';

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

function Shipment() {

    const [strTrackNumber, setTrackNumber] = useState<string | undefined>('');
    const [strSearchTrackNumber, setSearchTrackNumber] = useState<string | undefined>();
    const [objShipment, setObjShipment] = useState<IShipment|undefined>();

    const strTrackNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTrackNumber(e.target.value);
    }
    const loadShipmentDetails = (): void => {
      setSearchTrackNumber(strTrackNumber);
      setObjShipment(undefined);

      axios.get('https://tracking.bosta.co/shipments/track/'+ strTrackNumber).then(res => {
        setObjShipment({...objShipment, ...res.data});
      }).catch(e => {
        console.log(e)
      })
    }

    return (
    <div>
      <div className="card mt-2">
        <div className="card-body">
          <form className="form my-2 my-lg-0 row margin" onSubmit={e => { e.preventDefault(); loadShipmentDetails(); }}>
            <div className="col-md-3 mt-2">
              <label >Track your shipment</label>
            </div>
            <div className='col-md-6 mt-2'>
              <input type="search" placeholder='Track Number' className="form-control mr-sm-2" value={strTrackNumber} onChange={strTrackNumberChange} />
            </div>
            <div className="col-md-3 mt-2">
              <button type="button" className="btn btn-success pull-right" onClick={loadShipmentDetails}>Search</button>
            </div>
          </form>
        </div>
      </div>
      <ShipmentDetails  shipment={objShipment} trackNumber={strSearchTrackNumber} />
    </div>
  );
}

export default Shipment;
