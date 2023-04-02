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
   numDoc: '',
   fechaNac: null,
   fotoFrente: null,
   fotoReverso: null,
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

const obtenerEdad = (dateString)=> {
   let hoy = new Date()
   let fechaNacimiento = new Date(dateString)
   let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
   let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
   if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
   ) {
      edad--
   }
   return edad
}

const validarEmail = (email) =>{
   if(email.search(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/g) > -1)  return true;
   return false
}

const validarContrasena = (cantra1, contra2) => {
   if(cantra1 === contra2) return true
   return false;
}

const validarForm = () => {
   const {pais, sexo, primerNombre, segundoNombre, fechaNac, tipoDoc, numDoc, fotoFrente, fotoReverso, email,pass,confPass,telefono,celular } = infoPersona.value;
   switch(formGroup.value){
      case 1:
         console.log( numDoc.toString().length)
         if(pais&& sexo&& primerNombre&& segundoNombre&& fechaNac && obtenerEdad(fechaNac) >= 18 && tipoDoc&& numDoc&& numDoc.toString().length >= 5 && fotoFrente && fotoReverso )
            formGroup.value ++;
         
      break;

      case 2:

        if(email && validarEmail(email) && pass && confPass && validarContrasena(pass,confPass) && telefono && celular) formGroup.value ++;
      break;
   }

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
   validarForm()
}

const onAnterior = () => {
   formGroup.value --;
}

const onEnviar = () =>{
   alert('Se envió el registro correctamente')
   console.log( infoPersona.value);
} 
</script>

<template>
   <div class="flex items-center justify-center bg-indigo-600 h-fit">
      <div class="p-6 bg-white rounded-md shadow-lg w-96">
         <h1 class="block text-xl font-semibold text-center">{{titulos[formGroup - 1].toUpperCase()}}</h1>
            <div class="flex items-center justify-center w-full">
               <div class="flex items-center justify-center w-3 h-3 p-5 text-lg text-center border border-2 border-gray-700 rounded-full font-md">{{formGroup}}/3</div>
            </div>
         <hr class="mt-3">
         <!-- GURPO 1 -->
         <div v-if="formGroup == 1">
            <div class="mt-3">
               <label for="pais" class="block mb-2 text-base">País</label>
               <select v-model="infoPersona.pais" id="pais" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"  
              >
                  <option  disabled selected >Seleccione un país</option>
                  <option v-for="pais in paises" :key="pais" :value="pais">{{pais}}</option>
               </select>

               <p v-if="!infoPersona.pais || infoPersona.pais === 'Seleccione un país'" class="text-xs text-red-500">*Campo obligatorio</p>
               
            </div>
            
            <div class="mt-3">
               <label for="sexo" class="block mb-2 text-base">Sexo</label>
               <select v-model="infoPersona.sexo" id="sexo" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"  
               >
                  <option  disabled selected >Seleccione un sexo</option>
                  <option v-for="sexo in sexos" :key="sexo" :value="sexo">{{sexo}}</option>
               </select>
               <p v-if="!infoPersona.sexo || infoPersona.sexo === 'Seleccione un sexo'" class="text-xs text-red-500">*Campo obligatorio</p>
            </div>
            <div class="mt-3">
               <label for="primerNombre" class="block mb-2 text-base">Primer nombre</label>
               <input v-model="infoPersona.primerNombre" type="text" id="primerNombre" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Primer nombre" 
              >
               <p v-if="!infoPersona.primerNombre" class="text-xs text-red-500">*Campo obligatorio</p>
            </div>
            <div class="mt-3">
               <label for="segundoNombre" class="block mb-2 text-base">Segundo nombre</label>
               <input v-model="infoPersona.segundoNombre" type="text" id="segundoNombre" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Segundo nombre"
                
               >
               <p v-if="!infoPersona.segundoNombre" class="text-xs text-red-500">*Campo obligatorio</p>
            </div>
            <div class="mt-3">
               <label for="FechaNac" class="block mb-2 text-base">Fecha nacimiento</label>
               <input v-model="infoPersona.fechaNac"  type="date" id="FechaNac" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"
                
               >
               <p v-if="!infoPersona.fechaNac" class="text-xs text-red-500">*Campo obligatorio</p>
               <p v-if="obtenerEdad(infoPersona.fechaNac) < 18" class="text-xs text-red-500">*Debe ser mayor de edad</p>
            </div>

            <div class="mt-3">
               <label for="tipoDoc" class="block mb-2 text-base">Tipo documento</label>
               <select v-model="infoPersona.tipoDoc" name="" id="tipoDoc" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" 
               >
                  <option  disabled selected >Seleccione tipo documento</option>
                  <option v-for="tipoDoc in tipoDocs" :key="tipoDoc" :value="tipoDoc">{{tipoDoc}}</option>
               </select>
               <p v-if="!infoPersona.tipoDoc || infoPersona.tipoDoc === 'Seleccione tipo documento' " class="text-xs text-red-500">*Campo obligatorio</p>
            </div>

            <div class="mt-3">
               <label for="numDoc" class="block mb-2 text-base">Número documento</label>
               <input v-model="infoPersona.numDoc" type="number" id="numDoc" min="0" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Número documento" 
                >
                <p v-if="!infoPersona.numDoc" class="text-xs text-red-500">*Campo obligatorio</p>
                <p v-if="infoPersona.numDoc?.toString()?.length < 5" class="text-xs text-red-500">*El número debe tener como minimo 5 dígitos</p>
            </div>

            <div class="mt-3">
               <label for="fotoDoc1" class="block mb-2 text-base">Foto documento – Frente</label>
               <input @change="onFileFoto1" type="file" id="fotoDoc1" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"  accept="image/jpg, image/png" >
               <p v-if="!infoPersona.fotoFrente" class="text-xs text-red-500">*Campo obligatorio</p>
               <p v-if="infoPersona.fotoFrente" class="text-xs text-green-500">{{infoPersona.fotoFrente.name}}</p>
            </div>
            <div class="mt-3">
               <label for="fotoDoc2" class="block mb-2 text-base">Foto documento – Reverso</label>
               <input @change="onFileFoto2" type="file" id="fotoDoc2" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600"  accept="image/jpg, image/png" >
               <p v-if="!infoPersona.fotoReverso" class="text-xs text-red-500">*Campo obligatorio</p>
                <p v-if="infoPersona.fotoReverso" class="text-xs text-green-500">{{infoPersona.fotoFrente.name}}</p>
            </div>
         </div>

          <!-- GURPO 2 -->
         <div v-if="formGroup == 2">
           <div class="mt-3">
               <label for="email" class="block mb-2 text-base">Correo eléctronico</label>
               <input   v-model="infoPersona.email"  type="email" id="email" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Correo eléctronico" >
               <p v-if="!infoPersona.email" class="text-xs text-red-500">*Campo obligatorio</p>
               <p v-if="!validarEmail(infoPersona.email)" class="text-xs text-red-500">*Correo invalido</p>
            </div>
           <div class="mt-3">
               <label for="pass" class="block mb-2 text-base">Contraseña</label>
               <input v-model="infoPersona.pass"  type="password" id="pass" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Contaseña">
               <p v-if="!infoPersona.pass" class="text-xs text-red-500">*Campo obligatorio</p>
            </div>
           <div class="mt-3">
               <label for="pass" class="block mb-2 text-base">Confirmar contraseña</label>
               <input v-model="infoPersona.confPass"  type="password" id="pass" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Confirmar contraseña">
               <p v-if="!infoPersona.confPass" class="text-xs text-red-500">*Campo obligatorio</p>
               <p v-if="!validarContrasena(infoPersona.pass,infoPersona.confPass)" class="text-xs text-red-500">*Contraseña invalida</p>
           
            </div>
           <div class="mt-3">
               <label for="telefono" class="block mb-2 text-base">Teléfono</label>
               <input v-model="infoPersona.telefono"  type="number" id="telefono" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Teléfono">
               <p v-if="!infoPersona.telefono" class="text-xs text-red-500">*Campo obligatorio</p>
            </div>
           <div class="mt-3">
               <label for="celular" class="block mb-2 text-base">Celular</label>
               <input v-model="infoPersona.celular"  type="number" id="celular" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Celular">
                <p v-if="!infoPersona.celular" class="text-xs text-red-500">*Campo obligatorio</p>
            </div>
         </div>

         <!-- GURPO 3 -->
         <div v-if="formGroup == 3">
          
           <div class="mt-3">
               <label for="direccion" class="block mb-2 text-base">Dirección</label>
               <input v-model="infoPersona.direccion"  type="text" id="direccion" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Dirección">
               <p v-if="!infoPersona.direccion" class="text-xs text-red-500">*Campo obligatorio</p>
            </div>
           <div class="mt-3">
               <label for="codPostal" class="block mb-2 text-base">Código postal</label>
               <input v-model="infoPersona.codPostal"  type="text" id="codPostal" class="w-full px-2 py-1 text-base border focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Código postal">
                <p v-if="!infoPersona.codPostal" class="text-xs text-red-500">*Campo obligatorio</p>
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
               v-if="formGroup === 3 && infoPersona.direccion && infoPersona.codPostal "
               class="px-2 py-1 font-semibold text-white transition duration-700 ease-in-out transform bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
               @click="onEnviar"
               >Enviar</button>

            <button 
            v-if="formGroup != 3"
               class="px-2 py-1 font-semibold text-white transition duration-700 ease-in-out transform bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700"
               @click="onSiguiente"
               >Siguiente</button>
          </div>
      
      </div>
   </div>
</template>

