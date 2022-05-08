import React from 'react';
import axios from 'axios';

function SMSesSubmit() {

    const handleSMSSend = async (e) => {
        const senderName = document.getElementById('senderName').value;
        const receiverPhoneNumber = document.getElementById('receiverPhoneNumber').value;
        const smsContent = document.getElementById('smsContent').value;

        try {
            let response = await axios.post(
                `${process.env.REACT_APP_API_URL}/smses`,
                {
                    senderName,
                    receiverPhoneNumber,
                    smsContent
                });

                if(response.status === 200) {
                    alert(`SMS was successfully sent!`);
                }
        }
        catch (error) {
            alert('Something went wrong. Check input fields');
        }
    }

    return (
        <div id="SMSesSubmit">
            <div className='text-2xl font-bold mb-4'>Submit your SMS</div>
            <div className='text-xs mb-4'><p style={{ color: 'red' }}>The Admin will receive an audit log for this.</p></div>
            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="senderName">
                            Your name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="senderName" type="text" placeholder="John" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="receiverPhoneNumber">
                            Receiver phone number
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="receiverPhoneNumber" type="text" placeholder="+40728999888" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="smsContent">
                            Your SMS
                        </label>
                        <textarea
                            rows={4}
                            name="comment"
                            id="smsContent"
                            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-800 rounded-md p-5"
                            placeholder={'Say hello!'} />
                    </div>
                </div>
            </form>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize"
                        onClick={handleSMSSend}
                        value={"Send SMS!"}>
                        {"Send SMS!"}
                    </button>
        </div>
    );
}

export default SMSesSubmit;

