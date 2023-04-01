<script setup>
import { ref } from 'vue'
import axios from 'axios';
const paises = ref([])
const sexos = ref(['Masculino','Femenino','otro'])
const tipoDocs = ref(['Cedula de ciudadanía', 'Pasaporte','Cedula de extrajería'])
const titulos = ref(['Información principal','Información de contacto','Inforación de localización'])
const infoPersona = ref({
   pais:'Seleccione un país',
   sexo: 'Seleccione un sexo',
   primerNombre: '',
   segundoNombre: '',
   tipoDoc:'Seleccione tipo documento',
   numDoc:'',
   fechaNac: null,
   fotoFrente: {},
   fotoReverso: {},
   email:'',
   pass: '',
   confPass: '',
   telefono: '',
   celular: '',
   direccion: '',
   codPostal: ''
})
const formGroup = ref(1);

const getPaises = async () => {
   const {data} = await axios.get(`https://restcountries.com/v3.1/region/South America`)
   paises.value = data.map((p) => p.name.common)
}

getPaises()

const onFileFoto1 = (event) => {
   console.log(event.target.files[0])
   //infoPersona.fotoFrente = 

   infoPersona.value.fotoFrente = event.target.files[0];
}

const onFileFoto2 = (event) => {
   infoPersona.value.fotoReverso = event.target.files[0];
}

const onSiguiente = () => {
   console.log( infoPersona.value)

   formGroup.value ++;
}
const onAnterior = () => {
   console.log('Si funciona pai', infoPersona.value)

   formGroup.value --;
}
</script>

<template>
   <div class="flex items-center justify-center h-screen bg-indigo-600">
      <div class="p-6 bg-white rounded-md shadow-lg w-96">
         <h1 class="block text-xl font-semibold text-center">{{titulos[formGroup - 1].toUpperCase()}}</h1>
            <div class="flex items-center justify-center w-full">
               <div class="flex items-center justify-center w-5 h-5 p-5 text-lg font-semibold text-center border border-4 border-gray-700 rounded-full">{{formGroup}}/3</div>
            </div>
         <hr class="mt-3">
         <!-- GURPO 1 -->
         <div v-if="formGroup == 1">
            <div class="mt-3">
               <label for="pais" class="block mb-2 text-base">País</label>
               <select v-model="infoPersona.pais" id="pais" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"  
               :class="{'border-red-500': !infoPersona.pais, 'border-green-500': infoPersona.pais &&  infoPersona.pais !== 'Seleccione un país'}">
                  <option  disabled selected >Seleccione un país</option>
                  <option v-for="pais in paises" :key="pais" :value="pais">{{pais}}</option>
               </select>
               
            </div>
            
            <div class="mt-3">
               <label for="sexo" class="block mb-2 text-base">Sexo</label>
               <select v-model="infoPersona.sexo" id="sexo" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"  
               :class="{'border-red-500': !infoPersona.sexo  , 'border-green-500': infoPersona.sexo &&  infoPersona.sexo !== 'Seleccione un sexo'}">
                  <option  disabled selected >Seleccione un sexo</option>
                  <option v-for="sexo in sexos" :key="sexo" :value="sexo">{{sexo}}</option>
               </select>
               
            </div>
            <div class="mt-3">
               <label for="primerNombre" class="block mb-2 text-base">Primer nombre</label>
               <input v-model="infoPersona.primerNombre" type="text" id="primerNombre" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Primer nombre" 
               :class="{'border-red-500': !infoPersona.primerNombre, 'border-green-500': infoPersona.primerNombre}">
            </div>
            <div class="mt-3">
               <label for="segundoNombre" class="block mb-2 text-base">Segundo nombre</label>
               <input v-model="infoPersona.segundoNombre" type="text" id="segundoNombre" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Segundo nombre"
                :class="{'border-red-500': !infoPersona.segundoNombre, 'border-green-500': infoPersona.segundoNombre}"
               >
            </div>
            <div class="mt-3">
               <label for="FechaNac" class="block mb-2 text-base">Fecha nacimiento</label>
               <input v-model="infoPersona.fechaNac"  type="date" id="FechaNac" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
                :class="{'border-red-500': !infoPersona.fechaNac, 'border-green-500': infoPersona.fechaNac}"
               >
            </div>

            <div class="mt-3">
               <label for="tipoDoc" class="block mb-2 text-base">Tipo documento</label>
               <select v-model="infoPersona.tipoDoc" name="" id="tipoDoc" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" 
                :class="{'border-red-500': !infoPersona.tipoDoc , 'border-green-500': infoPersona.tipoDoc && infoPersona.tipoDoc !== 'Seleccione tipo documento'}">
                  <option  disabled selected >Seleccione tipo documento</option>
                  <option v-for="tipoDoc in tipoDocs" :key="tipoDoc" :value="tipoDoc">{{tipoDoc}}</option>
               </select>
               
            </div>

            <div class="mt-3">
               <label for="numDoc" class="block mb-2 text-base">Número documento</label>
               <input v-model="infoPersona.numDoc" type="text" id="numDoc" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Número documento" 
                :class="{'border-red-500': !infoPersona.numDoc, 'border-green-500': infoPersona.numDoc}">
            </div>

            <div class="mt-3">
               <label for="fotoDoc1" class="block mb-2 text-base">Foto documento – Frente</label>
               <input @change="onFileFoto1" type="file" id="fotoDoc1" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"  accept="image/jpg, image/png" >
            </div>
            <div class="mt-3">
               <label for="fotoDoc2" class="block mb-2 text-base">Foto documento – Reverso</label>
               <input @change="onFileFoto2" type="file" id="fotoDoc2" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"  accept="image/jpg, image/png" >
            </div>
         </div>

          <!-- GURPO 2 -->
         <div v-if="formGroup == 2">
           <div class="mt-3">
               <label for="email" class="block mb-2 text-base">Correo eléctronico</label>
               <input   v-model="infoPersona.email"  type="email" id="email" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Correo eléctronico" >
            </div>
           <div class="mt-3">
               <label for="pass" class="block mb-2 text-base">Contraseña</label>
               <input v-model="infoPersona.pass"  type="password" id="pass" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Contaseña">
            </div>
           <div class="mt-3">
               <label for="pass" class="block mb-2 text-base">Confirmar contraseña</label>
               <input v-model="infoPersona.confPass"  type="password" id="pass" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Confirmar contraseña">
            </div>
           <div class="mt-3">
               <label for="telefono" class="block mb-2 text-base">Teléfono</label>
               <input v-model="infoPersona.telefono"  type="text" id="telefono" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Teléfono">
            </div>
           <div class="mt-3">
               <label for="celular" class="block mb-2 text-base">Celular</label>
               <input v-model="infoPersona.celular"  type="text" id="celular" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Celular">
            </div>
         </div>

         <!-- GURPO 3 -->
         <div v-if="formGroup == 3">
          
           <div class="mt-3">
               <label for="direccion" class="block mb-2 text-base">Dirección</label>
               <input v-model="infoPersona.direccion"  type="text" id="direccion" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Dirección">
            </div>
           <div class="mt-3">
               <label for="codPostal" class="block mb-2 text-base">Código postal</label>
               <input v-model="infoPersona.codPostal"  type="text" id="codPostal" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Código postal">
            </div>
         </div>
          <hr class="mt-3">

          <div class="flex justify-center gap-32 mt-3">
            <button 
               v-if="formGroup != 1"
               class="px-2 py-1 font-semibold text-white transition duration-700 ease-in-out transform bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700"
               @click="onAnterior"
               >Anterior</button>
            <button 
            v-if="formGroup != 3"
               class="px-2 py-1 font-semibold text-white transition duration-700 ease-in-out transform bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700"
               @click="onSiguiente"
               >Siguiente</button>
          </div>
      
      </div>
   </div>
</template>

