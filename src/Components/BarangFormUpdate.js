import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function BarangFormUpdate() {
    const { id } = useParams();
    const [barangData, setBarangData] = useState(null);
    const [nama, setNama] = useState('');
    const [hargaBeli, setHargaBeli] = useState('');
    const [hargaJual, setHargaJual] = useState('');
    const [stok, setStok] = useState('');
    const [gambar, setGambar] = useState('');
    const [fileError, setFileError] = useState('');

    useEffect(() => {
        // Ambil data dari local storage berdasarkan id yang diterima
        const storedData = JSON.parse(localStorage.getItem('data')) || [];
        const barang = storedData.find(item => item.id === parseInt(id));
        setBarangData(barang);
        setNama(barang.nama);
        setHargaBeli(barang.hargaBeli);
        setHargaJual(barang.hargaJual);
        setStok(barang.stok);
        setGambar(barang.foto);
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (fileError) {
            alert(fileError);
            return;
        }

        const updatedBarang = {
            id: barangData.id,
            foto: gambar || barangData.foto,
            nama,
            hargaBeli,
            hargaJual,
            stok
        };

        const storedData = JSON.parse(localStorage.getItem('data')) || [];
        const updatedData = storedData.map(item => {
            if (item.id === barangData.id) {
                return updatedBarang;
            }
            return item;
        });

        localStorage.setItem('data', JSON.stringify(updatedData));

        alert('Data berhasil diperbarui!');
        window.location.href = '/'
    };

    const handleGambarChange = (e) => {
        const file = e.target.files[0];

        // Cek tipe file
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            setFileError('File gambar harus dalam format JPG atau PNG.');
            return;
        }

        // Cek ukuran file
        const maxSize = 100 * 1024; // 100KB
        if (file.size > maxSize) {
            setFileError('Ukuran file gambar harus maksimal 100KB.');
            return;
        }

        setFileError('');

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setGambar(reader.result);
        };
    };

    return (
        <div>
            <h1>Update Barang</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nama Barang</Form.Label>
                    <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Harga Beli</Form.Label>
                    <Form.Control type="number" value={hargaBeli} onChange={(e) => setHargaBeli(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Harga Jual</Form.Label>
                    <Form.Control type="number" value={hargaJual} onChange={(e) => setHargaJual(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stok</Form.Label>
                    <Form.Control type="number" value={stok} onChange={(e) => setStok(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Gambar</Form.Label>
                    {gambar && (
                        <div>
                            <img src={gambar} alt="Gambar Barang" style={{ width: '150px' }} />
                        </div>
                    )}
                    <Form.Control type="file" onChange={handleGambarChange} />
                </Form.Group>
                {fileError && <div className="text-danger">{fileError}</div>}
                <Button size='sm' type="submit" className='mt-2'>Update</Button>
                <Link to="/">
                    <Button size='sm' variant='danger' className='mt-2 mx-2'>Cancel</Button>
                </Link>
            </Form>
        </div>
    );
}

export default BarangFormUpdate;
