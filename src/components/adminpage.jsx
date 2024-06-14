import '../assets/css/sidebar.css';
import Sidebar from './sidebar';
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { getUsers, handleDelete } from './apihandler';

function Adminpage() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);
    const Deleteusers = async (id) => {
        try {
            await handleDelete(id); // Panggil fungsi deleteUser dari API handler
            setUsers(users.filter(user => user.id !== id)); // Update state users setelah berhasil dihapus
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error deletion
        }
    };

    const data = React.useMemo(() => users, [users]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'id', // Ganti dengan field yang sesuai dari data pengguna Anda
            },
            {
                Header: 'Nama Lengkap',
                accessor: data => `${data.first_name} ${data.last_name}`, // Gabungkan 'Nama Awal' dan 'Nama Akhir' menjadi 'Nama Lengkap'
            },
            {
                Header: 'Action',
                accessor: 'username', // Gunakan accessor yang unik untuk setiap baris (misalnya, id)
                Cell: ({ row }) => (
                    <div className='flex'>
                        <div className='mr-3'>
                            <button onClick={() => Deleteusers(row.original.id)} className="text-blue-500">Edit</button>

                        </div>
                        <div>
                            <button onClick={() => Deleteusers(row.original.id)} className="text-red-500">Delete</button>

                        </div>
                    </div>
                ),
            },
            // Tambahkan kolom lain sesuai kebutuhan
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>

            <Sidebar />
            <div class="flex-1 overflow-auto">
                <h1 class="text-3xl font-bold mb-4">Users List</h1>
                <div class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center" {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody class="divide-y divide-gray-200" {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr class="bg-gray-50" {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Adminpage