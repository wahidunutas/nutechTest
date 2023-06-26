import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button, Col, Row, ButtonGroup, Pagination } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { MdEditSquare, MdDeleteForever } from 'react-icons/md';

const BarangList = () => {
    const [data, setData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [activePage, setActivePage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        // Memuat data dari local storage saat komponen dimuat
        const savedData = localStorage.getItem('data');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    const handleDelClick = (id) => {
        const confirm = window.confirm('Ingin Menghapus Data Ini?');
        if (confirm) {
            handleDelete(id);
        }
    };

    const handleDelete = (id) => {
        const storedData = JSON.parse(localStorage.getItem('data')) || [];
        const updatedData = storedData.filter((item) => item.id !== id);
        localStorage.setItem('data', JSON.stringify(updatedData));
        setData(updatedData);
        console.log('Data berhasil dihapus!');
    };

    const handleUpdate = (id) => {
        const url = `/update/${id}`;
        navigate(url);
    };

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
        setActivePage(1); // Set halaman aktif ke 1 saat melakukan pencarian baru
    };

    const filteredData = data.filter((item) => {
        return item.nama.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    const itemsPerPage = 4;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logout berhasil');

        navigate('/login');
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h2>DATA BARANG</h2>
                <Button variant="btn btn-link" className='mb-4' size='sm' onClick={handleLogout}>Keluar</Button>

            </div>
            <Row>
                <Col>
                    <Link to="/tambah" className="text-white text-decoration-none">
                        <Button variant="primary" className="mb-4" size="sm">
                            Tambah Data Barang
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Form className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchKeyword}
                            onChange={handleSearch}
                        />
                    </Form>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Foto Barang</th>
                        <th>Nama Barang</th>
                        <th>Harga Beli</th>
                        <th>Harga Jual</th>
                        <th>Stok</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{startIndex + index + 1}</td>
                                    <td>
                                        <img
                                            src={item.foto}
                                            alt={item.nama}
                                            style={{ width: '50px' }} />
                                    </td>
                                    <td>{item.nama}</td>
                                    <td>{Number(item.hargaBeli).toLocaleString()}</td>
                                    <td>{Number(item.hargaJual).toLocaleString()}</td>
                                    <td>{item.stok}</td>
                                    <td>
                                        {/* <Button size='sm' variant='primary' onClick={() => handleUpdate(item.id)}><MdEditSquare /></Button>
                                        <Button size='sm' variant='danger' className='mx-2' onClick={() => handleDelClick(item.id)}><MdDeleteForever /></Button> */}
                                        <ButtonGroup aria-label="Basic example">
                                            <Button size='sm' variant='primary' onClick={() => handleUpdate(item.id)}><MdEditSquare /></Button>
                                            <Button size='sm' variant='danger' className='mx-2' onClick={() => handleDelClick(item.id)}><MdDeleteForever /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">Tidak ada data barang.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Pagination className='d-flex justify-content-end'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === activePage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};

export default BarangList;
