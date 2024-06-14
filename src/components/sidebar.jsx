import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    // Ganti dengan logika yang sesuai untuk menentukan role pengguna

    const handleProfile = () => {

        navigate('/profile');
    }
    const handleAdmin = () => {
        navigate('/admin');
    }
    const handleArticle = () => {
        navigate('/article')
    }
    const handleLogout = () => {

        console.log('Logging out...');
        // Contoh menghapus token dari local storage (misalnya jika menggunakan JWT)
        localStorage.removeItem('access');
        navigate('/login');
    };
    return (
        <div>
            <span class="absolute text-white text-4xl top-5 left-4 cursor-pointer" onclick="Openbar()">
                <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
            </span>
            <div class="sidebar fixed top-0 bottom-0 lg:left-0 left-[-300px] duration-1000
    p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen">
                <div class="text-gray-100 text-xl">
                    <div>
                        <div class="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600" onClick={username == 'admin' ? handleAdmin : handleProfile}>
                            <i class="bi bi-house-door-fill"></i>
                            <span class="text-[15px] ml-4 text-gray-200"><span class="text-[15px] ml-4 text-gray-200">
                                {username == 'admin' ? 'Users' : 'Profile'}
                            </span>
                            </span>
                        </div>
                        <div class="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600" onClick={handleArticle}>
                            <i class="bi bi-bookmark-fill"></i>
                            <span class="text-[15px] ml-4 text-gray-200">Article</span>
                        </div>


                        <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600" onClick={handleLogout}>
                            <i class="bi bi-box-arrow-in-right"></i>
                            <span class="text-[15px] ml-4 text-gray-200">Logout</span>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar