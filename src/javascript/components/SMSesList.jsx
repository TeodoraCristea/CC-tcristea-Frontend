import React, { useEffect, useState } from 'react';
import { UserIcon } from '@heroicons/react/solid'
import axios from 'axios';

function SMSesList() {
    const [SMSes, setSMSes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `${process.env.REACT_APP_API_URL}/smses`,
            );

            if (result.data.smses) {
                let smsesArray = result.data.smses;
                smsesArray.reverse();
                setSMSes(result.data.smses);
            }
        };

        fetchData();
    }, []);

    return (
        <div id="SMSesList">
            <div className='text-2xl font-bold mb-4'>Latest SMSes</div>
            <div className='text-xs mb-4'><p style={{ color: 'red' }}>Only the Admin can see SMSes contents.(For privacy concerns)</p></div>
            <ul className="-mb-8 max-h-96 overflow-auto">
                {SMSes.length ? SMSes.map((SMS, SMSIdx) => (
                    <li key={SMS.smsID}>
                        <div className="relative pb-8">
                            {SMSIdx !== SMSes.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <span
                                    className={'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-green-500'}>
                                    <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-900">
                                            {SMS.senderName}
                                        </span>
                                        <span className="font-medium">
                                            {` sent an sms to ${SMS.receiverPhoneNumber} at ${SMS.sentAtTime}.`}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                )) :
                    <span>No SMSes yet</span>
                }
            </ul>
        </div>
    );
}

export default SMSesList;