import { Play } from 'phosphor-react'
import {
  CountdonwContainer,
  FormContainer,
  HomeContainer,
  MinutesAmoutInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmout: zod
    .number()
    .min(5, 'O ciclo mínimo deve ser de 5 minutos.')
    .max(60, 'O ciclo máximo deve ser de 60 minutos.'),
})

export function Home() {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })

  console.log(formState.errors)

  const taskWatched = watch('task')
  const isSubmitDisaled = !taskWatched

  function doSubmit(data: any) {
    console.log(data)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(doSubmit)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Goiaba" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmoutInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('munitesAmout', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdonwContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdonwContainer>

        <StartCountdownButton disabled={isSubmitDisaled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
