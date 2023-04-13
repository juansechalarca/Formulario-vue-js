

<script setup>
    import { Form } from 'vee-validate';
    import * as Yup from 'yup';
    import TextInput from './TextInput.vue'
    import { ref } from 'vue'
    import { Switch } from '@headlessui/vue'
    const enabled = ref(false)


     const onSubmit = (values)=> {
      alert(JSON.stringify(values, null, 2));

      
    }

     const onInvalidSubmit = (e)=> {
      const submitBtn = document.querySelector('.btn');
      submitBtn.classList.add('cursor-not-allowed');
     
      setTimeout(() => {
      
        submitBtn.classList.remove('cursor-not-allowed');
      }, 1000);
    }

// Using yup to generate a validation schema
// https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      date_birth: Yup.date().required(),
      password: Yup.string().min(6).required(),
      confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
    });
</script>

<template>
<nav class="bg-transparent">
  <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
     
      <div class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <a href="#"  aria-current="page"><font-awesome-icon icon="fa-brands fa-instagram"  class="w-8 h-8"/></a>
            <a href="#"  aria-current="page"><font-awesome-icon icon="fa-brands fa-twitter"  class="w-8 h-8"/></a>
            <a href="#"  aria-current="page"><font-awesome-icon icon="fa-brands fa-youtube"  class="w-8 h-8"/></a>

          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <span class="mx-3 font-extrabold text-black">English</span>
        <Switch
            v-model="enabled"
            :class="enabled ? 'bg-gray-400' : 'bg-black'"
            class="relative inline-flex items-center h-6 rounded-full w-11"
        >
            <span class="sr-only">Enable notifications</span>
            <span
            :class="enabled ? 'translate-x-6' : 'translate-x-1'"
            class="inline-block w-4 h-4 transition transform bg-white rounded-full"
         />
     </Switch>
     <span class="mx-3 font-extrabold text-black">Español</span>
      </div>
    </div>
  </div>
</nav>



<div class="grid h-full place-items-center">
    <div class="p-6 bg-transparent w-96">
        <p v-if="enabled" class="mx-10 font-semibold text-center text-gray-500">Aumenta tus ingresos através de tu contenido</p>
        <p v-else class="mx-10 font-semibold text-center text-gray-500">Increase your income through your content</p>
        <div class="relative">
             <font-awesome-icon icon="fa-solid fa-arrow-circle-down" class="absolute top-0 h-10 text-purple-950 w-9 right-8" />
        <div class="p-2 m-8 font-semibold text-center text-white bg-purple-800 rounded-3xl" >{{ enabled ? 'Regístrate aquí': 'Sign up here'}}</div>
        </div>
       

        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          @invalid-submit="onInvalidSubmit"
         >
           
             <TextInput
                name="email"
                type="email"
                :placeholder="enabled? 'Correo Eléctronico': 'Email'"
                icon = 'fa-regular fa-envelope'
              />

             <TextInput
                name="name"
                type="text"
                :placeholder="enabled? 'Nombre completo': 'Full name'"
                icon = 'fa-regular fa-user'
              />
             
             <TextInput
                name="date_birth"
                type="date"
                :placeholder="enabled? 'Fecha de nacimiento': 'Birthdate'"
                icon = 'fa-regular fa-calendar-days'
              />
            
             

             <TextInput
                name="password"
                type="password"
                :placeholder="enabled? 'Contraseña': 'Password'"
                icon = 'fa-solid fa-lock'
              />

             <TextInput
                name="confirm_password"
                type="password"
                :placeholder="enabled ? 'Repetir contraseña': 'Repeat password'"
                icon = 'fa-solid fa-lock'
              />

            <p v-if="enabled" class="text-xs font-semibold text-center text-gray-600">Al completar el registro usted está aceptando nuestras <a href="#" class="font-bold text-black">politicas de privacidad</a> y <a href="#" class="font-bold text-black">términos de servicio</a> además que cumple con la mayoría de edad de su lugar de residecia.</p>
            <p v-else class="text-xs font-semibold text-center text-gray-600">By completing the registration you are accepting our <a href="#" class="font-bold text-black">privacy policies</a> and <a href="#" class="font-bold text-black">terms of service</a> in addition to complying with the age of majority of your place of residence.</p>
            <button class="btn" type="submit">{{ enabled ? 'Regístrate': 'Sign up'}}</button>
           
        </Form>

       
    </div>
</div>

   
</template>

