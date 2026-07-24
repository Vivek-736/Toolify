'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from '@/context/userDetailContext';
import { useUser } from '@clerk/nextjs';

function Provider({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        user && CreateNewUser();
    }, [user]);

    const CreateNewUser = async () => {
        const result = await axios.post('/api/user', {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        });
        setUserDetail(result.data);
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <div>
                {children}
            </div>
        </UserDetailContext.Provider>
    )
}

export default Provider;
