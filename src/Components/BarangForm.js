import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function BarangForm() {
    const [nama, setNama] = useState('')
    const [hargaBeli, setHargaBeli] = useState('')
    const [hargaJual, setHargaJual] = useState('')
    const [stok, setStok] = useState('')
    const [gambar, setGambar] = useState('')
    const [fileError, setFileError] = useState('')
    const [duplicateError, setDuplicateError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        // Cek apakah nama barang sudah tersedia
        const storedData = JSON.parse(localStorage.getItem('data')) || [];
        const existingBarang = storedData.find((item) => item.nama.toLowerCase() === nama.toLowerCase());
        if (existingBarang) {
            setDuplicateError('Nama barang sudah tersedia');
            return;
        }

        // Lanjutkan dengan pengolahan data jika nama barang belum tersedia

        const newBarang = {
            id: Date.now(),
            foto: gambar,
            nama,
            hargaBeli,
            hargaJual,
            stok,
        };

        const updatedData = [...storedData, newBarang];
        localStorage.setItem('data', JSON.stringify(updatedData));

        setNama('');
        setHargaBeli('');
        setHargaJual('');
        setStok('');
        setGambar('');
        setFileError('');
        setDuplicateError('');

        alert('Barang berhasil ditambahkan!');
        navigate('/');
    };

    const handleGambarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                if (file.size <= 100 * 1024) {
                    reader.onloadend = () => {
                        setGambar(reader.result);
                    };

                    reader.readAsDataURL(file);
                    setFileError('');
                } else {
                    setFileError('Ukuran file melebihi batas maksimal (100KB)');
                }
            } else {
                setFileError('Format file tidak valid. Harap unggah file dalam format PNG atau JPG');
            }
        }
    };

    return (
        <div>
            <h1>Tambah Barang</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nama Barang:</Form.Label>
                    <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                    {duplicateError && <p style={{ color: 'red' }}>{duplicateError}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Harga Beli:</Form.Label>
                    <Form.Control type="number" value={hargaBeli} onChange={(e) => setHargaBeli(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Harga Jual:</Form.Label>
                    <Form.Control type="number" value={hargaJual} onChange={(e) => setHargaJual(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stok:</Form.Label>
                    <Form.Control type="number" value={stok} onChange={(e) => setStok(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Foto Barang:</Form.Label>
                    <Form.Control type="file" onChange={handleGambarChange} />
                </Form.Group>
                {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
                {/* {duplicateError && <p style={{ color: 'red' }}>{duplicateError}</p>} */}
                <Button size='sm' type="submit" variant="primary" className='mt-2' disabled={!!fileError}>
                    Tambahkan
                </Button>
                <Link to="/">
                    <Button size='sm' variant="danger" className='mx-2 mt-2'>
                        Cancel
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default BarangForm;
