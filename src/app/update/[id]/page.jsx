"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import camera from "../../img/photo-lg-0.svg"
import arrows from "../../img/arrows.svg"
import btnClose from "../../img/btn-close.svg"
import btnUpdate from "../../img/btn-update.svg"
import btnBack from "../../img/btn-back.svg"
import Image from 'next/image'
import axios from 'axios';
import { useParams } from 'next/navigation';

function page() {

  const [razas, setRazas] = useState([])
  const [category, setCategory] = useState([])
  const [genders, setGenders] = useState([])
  const [file, setFile] = useState(null)
  const [mascota, setMascota] = useState([])
  const {id} = useParams();

  const [pet, setPet] = useState({
    name: "",
    race_id: "",
    category_id: "",
    photo: "img update",
    gender_id: "",
  })

  const getMascota = async () => {
    try {
        const respuesta = await axios.get(`http://localhost:3000/api/mascotas/${id}`)
        const mascotaData = respuesta.data;
      setPet({
        name: mascotaData.name,
        race_id: mascotaData.race_id,
        category_id: mascotaData.category_id,
        gender_id: mascotaData.gender_id,
        photo: mascotaData.photo || "img update"
      });
    } catch (error) {
        console.log(error.reponse.data);
    }
 }

  const getRazas = async () => {
    try {
      const razas = await axios.get("http://localhost:3000/api/razas");
      const respuesta = razas.data.datos;
      setRazas(respuesta)
    } catch (error) {
      console.log(error);
    }
  }
  const getCategory = async () => {
    try {
      const razas = await axios.get("http://localhost:3000/api/categorias");
      const respuesta = razas.data.datos;
      setCategory(respuesta)
    } catch (error) {
      console.log(error);
    }
  }
  const getGenders = async () => {
    try {
      const razas = await axios.get("http://localhost:3000/api/generos");
      const respuesta = razas.data.datos;
      setGenders(respuesta)
    } catch (error) {
      console.log(error);
    }
  }

  const inputValue = (event) => {
    setPet({
      ...pet,
      [event.target.name]: event.target.value
    })
  }


  const putMascota = async (event) => {
    event.preventDefault();
    try {
      if (!pet.race_id) {
        console.log("El campo 'race_id' es requerido");
        return;
      }
  
      const petData = {
        name: pet.name,
        race_id: parseInt(pet.race_id, 10),
        category_id: parseInt(pet.category_id, 10),
        gender_id: parseInt(pet.gender_id, 10),
        photo: pet.photo
      };
  
      const update = await axios.put(`http://localhost:3000/api/mascotas/${id}`, petData);
      console.log(update);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  

  useEffect(() => {
    getRazas();
    getCategory();
    getGenders();
    getMascota();
  }, [])


  return (
    <div className='flex justify-center items-center'>
      <div className='bg-back-image bg-cover bg-center md:w-1/4 w-full h-screen flex  flex-col p-3 gap-3'>
    <div className='flex h-12 w-full justify-center items-center gap-4' >
    <Link href="/pets">
        <Image
        src={btnBack}
        alt='btn-back'
        />
        </Link>
    <h1 className='text-white text-center w-full'>Modificar mascotas</h1>
       <Link href="/">
          <Image
          src={btnClose}
          alt='btn cerrar'
          />
         </Link>
    </div>
    <div className='h-64 flex justify-center items-center'>
         <div className='rounded-full w-32 h-32 bg-green-100 border-2 border-gray-500 flex justify-center items-center'>
         {
            file && file ? (
            <Image
            className='rounded-full w-full'
            src={URL.createObjectURL(file)}
            alt='img'
            width={100}
            height={100}
            />
          ): 
            <Image
            src={camera}
            alt='camera'
            />
          }
         </div>
         
        </div>
    <div className="">
        <form className='flex flex-col items-center gap-3' onSubmit={putMascota}>
            <input name='name' onChange={inputValue} value={pet.name}
            className='p-3 w-full bg-[#ffffffa5] outline-none placeholder:text-[#252f7c] rounded-[30px]' type="text" />
            <select name='race_id' onChange={inputValue} value={pet.race_id}
            className='p-3 w-full bg-[#ffffffa5] outline-none   rounded-[30px]'>
              {
                razas.map(raza => (
                  <option key={raza.id} value={raza.id}>
                    {raza.name}
                  </option>
                ))
              }
            </select>
            <select name='category_id' onChange={inputValue} value={pet.category_id}
             className='p-3 w-full bg-[#ffffffa5] outline-none  rounded-[30px]'>
              {
                category.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              }
            </select>
            <input name='photo' 
            onChange={(e) => {
              setFile(e.target.files[0])
            }}
            className='p-3 w-full bg-[#ffffffa5] outline-none placeholder:text-[#252f7c] rounded-[30px]' type="file" placeholder='Subir Foto' />
            <select name='gender_id' onChange={inputValue} value={pet.gender_id}
             className='p-3 w-full bg-[#ffffffa5] outline-none  rounded-[30px]'>
              {
                genders.map(gender => (
                  <option key={gender.id} value={gender.id}>
                    {gender.name}
                  </option>
                ))
              }
            </select>
            <button type='submit'>
            <Image  src={btnUpdate} 
        alt='btn close'/>
            </button>
         </form>
    </div>
 </div>
    </div>
  )
}

export default page