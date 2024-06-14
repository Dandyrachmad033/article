import Sidebar from "./sidebar"
import React, { useEffect, useState } from 'react';
import { getProfile } from "./apihandler"
function DetailProfile() {
    const [profile, setProfile] = useState(null); // State untuk menyimpan data profil
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile(); // Panggil fungsi API handler untuk mendapatkan profil
                setProfile(profileData);
                console.log(profileData);// Simpan data profil ke dalam state
            } catch (error) {
                setError(error.message); // Tangani jika terjadi kesalahan saat mengambil profil
            }
        };

        fetchProfile();
    }, []);
    if (error) {
        return <div>Error: {error}</div>; // Tampilkan pesan error jika terjadi kesalahan
    }
    return (
        <div>
            <Sidebar />
            {profile ? (
                <div className="card w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title"> Details User</h2>
                        <p> First Name: {`${profile.first_name}`}</p>
                        <p> last Name :  {`${profile.last_name}`}</p>
                        <p> Role :  {`${profile.role}`}</p>

                    </div>
                </div>
            ) : (
                <div>Loading...</div> // Tampilkan pesan loading jika data profil sedang diambil
            )}
        </div>


    )
}

export default DetailProfile