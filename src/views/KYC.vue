<template>
  <div class="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
    <div class="w-full max-w-2xl">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="../assets/logo.svg" alt="NextPay" class="h-12 mx-auto mb-4" />
      </div>

      <!-- Main Form -->
      <div class="bg-[#1A1A1A] rounded-lg p-8 shadow-xl border border-gray-800">
        <!-- Progress Steps -->
        <div class="flex justify-between mb-8">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
              :class="[
                currentStep > index 
                  ? 'bg-[#E5FB3C] text-black'
                  : currentStep === index
                    ? 'bg-[#E5FB3C] text-black'
                    : 'bg-gray-700 text-gray-400'
              ]"
            >
              {{ index + 1 }}
            </div>
            <div 
              v-if="index < steps.length - 1"
              class="w-full h-1 mx-2"
              :class="[
                currentStep > index ? 'bg-[#E5FB3C]' : 'bg-gray-700'
              ]"
            ></div>
          </div>
        </div>

        <!-- Step Content -->
        <div class="space-y-6">
          <!-- Step 1: Basic Information -->
          <div v-if="currentStep === 0">
            <h2 class="text-xl font-semibold text-white mb-2">Informações Básicas</h2>
            <p class="text-gray-400 mb-6">Preencha seus dados pessoais para começar</p>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
                <input 
                  v-model="form.fullName"
                  type="text"
                  class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
                  :class="{ 'border-red-500': errors.fullName }"
                  @blur="validateField('fullName')"
                />
                <span v-if="errors.fullName" class="text-xs text-red-500 mt-1">{{ errors.fullName }}</span>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Data de Nascimento</label>
                <input 
                  v-model="form.birthDate"
                  type="date"
                  class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
                  :class="{ 'border-red-500': errors.birthDate }"
                  @blur="validateField('birthDate')"
                />
                <span v-if="errors.birthDate" class="text-xs text-red-500 mt-1">{{ errors.birthDate }}</span>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Nacionalidade</label>
                <select 
                  v-model="form.nationality"
                  class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
                  :class="{ 'border-red-500': errors.nationality }"
                  @blur="validateField('nationality')"
                >
                  <option value="">Selecione sua nacionalidade</option>
                  <option value="BR">Brasileira</option>
                  <option value="OTHER">Outra</option>
                </select>
                <span v-if="errors.nationality" class="text-xs text-red-500 mt-1">{{ errors.nationality }}</span>
              </div>
            </div>
          </div>

          <!-- Step 2: Documents -->
          <div v-if="currentStep === 1">
            <h2 class="text-xl font-semibold text-white mb-2">Documentos</h2>
            <p class="text-gray-400 mb-6">Envie seus documentos para verificação</p>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">CPF</label>
                <input 
                  v-model="form.cpf"
                  type="text"
                  class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
                  :class="{ 'border-red-500': errors.cpf }"
                  @blur="validateField('cpf')"
                />
                <span v-if="errors.cpf" class="text-xs text-red-500 mt-1">{{ errors.cpf }}</span>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">RG/CNH/Passaporte</label>
                <input 
                  v-model="form.documentNumber"
                  type="text"
                  class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
                  :class="{ 'border-red-500': errors.documentNumber }"
                  @blur="validateField('documentNumber')"
                />
                <span v-if="errors.documentNumber" class="text-xs text-red-500 mt-1">{{ errors.documentNumber }}</span>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Documento de Identificação (Frente)</label>
                <div 
                  class="w-full h-32 bg-[#0D0D0D] border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#E5FB3C] transition-colors"
                  @click="triggerFileInput('docFront')"
                >
                  <div v-if="!form.docFront" class="text-center">
                    <i class="pi pi-upload text-2xl text-gray-400 mb-2"></i>
                    <p class="text-sm text-gray-400">Clique para enviar</p>
                  </div>
                  <img v-else :src="form.docFront" class="max-h-full" />
                </div>
                <input 
                  ref="docFrontInput"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleFileUpload('docFront', $event)"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Documento de Identificação (Verso)</label>
                <div 
                  class="w-full h-32 bg-[#0D0D0D] border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#E5FB3C] transition-colors"
                  @click="triggerFileInput('docBack')"
                >
                  <div v-if="!form.docBack" class="text-center">
                    <i class="pi pi-upload text-2xl text-gray-400 mb-2"></i>
                    <p class="text-sm text-gray-400">Clique para enviar</p>
                  </div>
                  <img v-else :src="form.docBack" class="max-h-full" />
                </div>
                <input 
                  ref="docBackInput"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleFileUpload('docBack', $event)"
                />
              </div>
            </div>
          </div>

          <!-- Step 3: Address -->
          <div v-if="currentStep === 2">
            <h2 class="text-xl font-semibold text-white mb-2">Endereço</h2>
            <p class="text-gray-400 mb-6">Informe seu endereço completo</p>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">CEP</label>
                <input 
                  v-model="form.zipCode"
                  type="text"
                  class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
                  :class="{ 'border-red-500': errors.zipCode }"
                  @blur="validateField('zipCode')"
                />
                <span v-if="errors.zipCode" class="text-xs text-red-500 mt-1">{{ errors.zipCode }}</span>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Rua</label>
                  <input 
                    v-model="form.street"
                    type="text"
                    class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
                    :class="{ 'border-red-500': errors.street }"
                    @blur="validateField('street')"
                  />
                  <span v-if="errors.street" class="text-xs text-red-500 mt-1">{{ errors.street }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Número</label>
                  <input 
                    v-model="form.number"
                    type="text"
                    class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
                    :class="{ 'border-red-500': errors.number }"
                    @blur="validateField('number')"
                  />
                  <span v-if="errors.number" class="text-xs text-red-500 mt-1">{{ errors.number }}</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Complemento</label>
                <input 
                  v-model="form.complement"
                  type="text"
                  class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Comprovante de Residência</label>
                <div 
                  class="w-full h-32 bg-[#0D0D0D] border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#E5FB3C] transition-colors"
                  @click="triggerFileInput('proofOfAddress')"
                >
                  <div v-if="!form.proofOfAddress" class="text-center">
                    <i class="pi pi-upload text-2xl text-gray-400 mb-2"></i>
                    <p class="text-sm text-gray-400">Clique para enviar</p>
                    <p class="text-xs text-gray-500">PDF ou imagem (últimos 3 meses)</p>
                  </div>
                  <div v-else class="text-center">
                    <i class="pi pi-file text-2xl text-[#E5FB3C] mb-2"></i>
                    <p class="text-sm text-white">Documento enviado</p>
                  </div>
                </div>
                <input 
                  ref="proofOfAddressInput"
                  type="file"
                  class="hidden"
                  accept=".pdf,image/*"
                  @change="handleFileUpload('proofOfAddress', $event)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <button 
            v-if="currentStep > 0"
            @click="prevStep"
            class="px-6 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Voltar
          </button>
          <button 
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            class="ml-auto px-6 py-2 text-sm bg-[#E5FB3C] text-black rounded-lg hover:bg-[#d4ea2c] transition-colors"
            :disabled="!isStepValid"
          >
            Próximo
          </button>
          <button 
            v-else
            @click="submitForm"
            class="ml-auto px-6 py-2 text-sm bg-[#E5FB3C] text-black rounded-lg hover:bg-[#d4ea2c] transition-colors"
            :disabled="!isStepValid || loading"
          >
            <i v-if="loading" class="pi pi-spinner pi-spin mr-2"></i>
            {{ loading ? 'Enviando...' : 'Concluir' }}
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-400">
          Já possui uma conta?
          <router-link to="/login" class="text-[#E5FB3C] hover:text-[#d4ea2c]">
            Fazer login →
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const steps = ['Informações Básicas', 'Documentos', 'Endereço']
const currentStep = ref(0)
const loading = ref(false)

const form = ref({
  // Step 1
  fullName: '',
  birthDate: '',
  nationality: '',

  // Step 2
  cpf: '',
  documentNumber: '',
  docFront: null as string | null,
  docBack: null as string | null,

  // Step 3
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  proofOfAddress: null as string | null
})

const errors = ref({
  fullName: '',
  birthDate: '',
  nationality: '',
  cpf: '',
  documentNumber: '',
  zipCode: '',
  street: '',
  number: ''
})

// File input refs
const docFrontInput = ref<HTMLInputElement | null>(null)
const docBackInput = ref<HTMLInputElement | null>(null)
const proofOfAddressInput = ref<HTMLInputElement | null>(null)

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 0:
      return form.value.fullName && form.value.birthDate && form.value.nationality &&
             !errors.value.fullName && !errors.value.birthDate && !errors.value.nationality
    case 1:
      return form.value.cpf && form.value.documentNumber && form.value.docFront && form.value.docBack &&
             !errors.value.cpf && !errors.value.documentNumber
    case 2:
      return form.value.zipCode && form.value.street && form.value.number && form.value.proofOfAddress &&
             !errors.value.zipCode && !errors.value.street && !errors.value.number
    default:
      return false
  }
})

function validateField(field: string) {
  errors.value[field] = ''

  switch (field) {
    case 'fullName':
      if (!form.value.fullName) {
        errors.value.fullName = 'Nome completo é obrigatório'
      } else if (form.value.fullName.length < 3) {
        errors.value.fullName = 'Nome deve ter no mínimo 3 caracteres'
      }
      break
    case 'birthDate':
      if (!form.value.birthDate) {
        errors.value.birthDate = 'Data de nascimento é obrigatória'
      }
      break
    case 'nationality':
      if (!form.value.nationality) {
        errors.value.nationality = 'Nacionalidade é obrigatória'
      }
      break
    case 'cpf':
      if (!form.value.cpf) {
        errors.value.cpf = 'CPF é obrigatório'
      } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.value.cpf)) {
        errors.value.cpf = 'CPF inválido'
      }
      break
    // Add other validations as needed
  }
}

function triggerFileInput(type: 'docFront' | 'docBack' | 'proofOfAddress') {
  const input = {
    docFront: docFrontInput,
    docBack: docBackInput,
    proofOfAddress: proofOfAddressInput
  }[type]

  input.value?.click()
}

function handleFileUpload(type: 'docFront' | 'docBack' | 'proofOfAddress', event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // In a real application, you would upload the file to your server
  // For this example, we'll just create a data URL
  const reader = new FileReader()
  reader.onload = (e) => {
    form.value[type] = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

async function submitForm() {
  try {
    loading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Documentação enviada com sucesso! Em breve analisaremos suas informações.',
      life: 5000
    })
    
    router.push('/dashboard')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao enviar documentação. Tente novamente.',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}
</script>
```