import React from 'react';

import Header from './Header';
import SMSesList from './SMSesList';
import SMSesSubmit from './SMSesSubmit';

function MainPage() {
    return (
        <div id="MainPage">
            <Header />
                <div className="flex max-w-7xl m-auto px-14 py-24">
                    <div className='w-1/2 pr-5'>
                        <SMSesList />
                    </div>
                    <div className='w-1/2 pl-5'>
                        <SMSesSubmit />
                    </div>
                </div>
        </div>
    );
}

export default MainPage;