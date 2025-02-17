import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import zod from 'zod'
import { HomeContainer, StartCountdownButton } from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { Pause, Play } from 'phosphor-react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCyle, doInterruptCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset } = newCycleForm

  function doCreateNewCycle(data: NewCycleFormData) {
    createNewCyle(data)
    reset()
  }

  const taskWatched = newCycleForm.watch('task')
  const isSubmitDisaled = !taskWatched

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(doCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
        <StartCountdownButton
          disabled={!activeCycle && isSubmitDisaled}
          type={activeCycle ? 'button' : 'submit'}
          variant={activeCycle ? 'interrupt' : undefined}
          onClick={activeCycle ? doInterruptCycle : undefined}
        >
          {activeCycle ? <Pause size={24} /> : <Play size={24} />}
          {activeCycle ? 'Interromper' : 'Iniciar'}
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
