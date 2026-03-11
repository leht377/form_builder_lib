import type { DuplicateFormPayload } from '@/types/response.types'
import { API_URL } from '../../config/enviroments'
import { httpRequest } from '../../lib/http-request'
import type {
  AddQuestiontoFormRequets,
  DeleteQuestionRequest,
  DeleteSectionRequest,
  Form,
  FormAnswersVerification,
  FormQuestionType,
  FormResponse,
  ReorderQuestionRequest,
  ReorderSectionRequest,
  Section,
  UpdateAnswerRequest,
  UpdateQuestionRequest,
  UpdateSectionRequets,
  UploadFile
} from '../types/form-builder.types'

const url = API_URL('form', 'v1')

export const createSectionService = (formId: string) =>
  httpRequest<Section>({
    url: `${url}/forms/${formId}/sections`,
    method: 'post'
  })

export const listQuestionTypesService = () =>
  httpRequest<FormQuestionType[]>({
    url: `${url}/question-types`,
    method: 'get'
  })

export const addQuestionToFormService = (data: AddQuestiontoFormRequets) =>
  httpRequest({
    url: `${url}/forms/${data.formId}/sections/${data.sectionId}/questions`,
    method: 'post',
    data
  })

export const reorderQuestionService = (data: ReorderQuestionRequest) =>
  httpRequest<Section>({
    url: `${url}/forms/${data.formId}/reorder-questions`,
    method: 'put',
    data
  })

export const reorderSectionsService = (data: ReorderSectionRequest) =>
  httpRequest<Section>({
    url: `${url}/forms/${data.formId}/reorder-sections`,
    method: 'put',
    data
  })
export const deleteSectionsService = (data: DeleteSectionRequest) =>
  httpRequest<Section>({
    url: `${url}/forms/${data.formId}/sections/${data.sectionId}`,
    method: 'delete'
  })

export const uploadFileService = (data: FormData) =>
  httpRequest<UploadFile[]>({
    url: `${url}/uploads`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })

export const deleteFileService = (id: string) =>
  httpRequest<UploadFile[]>({
    url: `${url}/uploads/${id}`,
    method: 'delete'
  })

export const deleteQuestionService = (data: DeleteQuestionRequest) =>
  httpRequest({
    url: `${url}/forms/${data.formId}/sections/${data.sectionId}/questions/${data.questionId}`,
    method: 'delete'
  })
export const updateSectionsService = (data: UpdateSectionRequets) =>
  httpRequest<Section>({
    url: `${url}/forms/${data.formId}/sections/${data.sectionId}`,
    method: 'put',
    data
  })

export const updateQuestionService = (data: UpdateQuestionRequest) =>
  httpRequest({
    url: `${url}/forms/${data.formId}/sections/${data.sectionId}/questions/${data.questionId}`,
    method: 'put',
    data
  })
export const updateAnswerForEspecificFormResponse = (data: UpdateAnswerRequest) =>
  httpRequest({
    url: `${url}/forms/${data.formId}/responses/${data.responseId}/answers`,
    method: 'put',
    data
  })

export const showFormService = (formId: string) =>
  httpRequest<Form>({
    url: `${url}/forms/${formId}`,
    method: 'get'
  })
export const showFormResponseService = (formId: string, responseId: string) =>
  httpRequest<FormResponse>({
    url: `${url}/forms/${formId}/responses/${responseId}`,
    method: 'get'
  })

export const showQuestionTypeService = (id: string) =>
  httpRequest<FormQuestionType>({
    url: `${url}/question-types/${id}`,
    method: 'get'
  })

export const verifyFormHaveAnswersService = (id: string) =>
  httpRequest<FormAnswersVerification>({
    url: `${url}/forms/${id}/verifyAnswers`,
    method: 'get'
  })

export const duplicateFormService = (id: string, data: DuplicateFormPayload) =>
  httpRequest<Form>({
    url: `${url}/forms/${id}/duplicate`,
    method: 'post',
    data
  })
