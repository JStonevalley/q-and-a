import React, { useEffect, useState } from 'react'
import { Button, Heading, Box, Chart } from 'grommet'

const GhostAlternative = () => <Box margin={{horizontal: 'small'}} style={{
  height: '0px',
  flex: '1 0 26%'
}} />

const ALTERNATIVES = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

export const Answer = () => {
  const [ answer, setAnswer ] = useState()
  const [ numberOfAlternatives, setNumberOfAlternatives ] = useState(9)
  const [ answers, setAnswers ] = useState()
  useEffect(() => {
    setAnswers(() => ALTERNATIVES.slice(0, numberOfAlternatives).reduce((map, key) => {
      map[key] = 0
      return map
    }, {}))
  }, [numberOfAlternatives])
  const totalAnswerCount = Object.keys(answers || {}).reduce((totalAnswerCount, alternative) => totalAnswerCount + answers[alternative], 0)
  console.log(answers, totalAnswerCount)
  const done = totalAnswerCount >= 10
  return <>
    <Heading textAlign='center' alignSelf='center' level={1} size='small' >Question</Heading>
    <Box direction='row' justify='center'>
      <Box width={{"max": "500px"}}>
        <Box direction='row' flex='grow 1' wrap>
          {ALTERNATIVES.map((alternative) => alternative <= numberOfAlternatives
            ? <Button
                style={{ flex: '1 0 26%' }}
                key={`alternative-${alternative}`}
                onClick={() => {
                  setAnswer(alternative)
                  setAnswers({ ...answers, [alternative]: answers[alternative] + 1})
                }}
                primary
                disabled={done}
                label={alternative}
                margin='small'
                size='large'
                color={answer === alternative && 'accent-1'}
              />
            : <GhostAlternative key={`ghost-alternative-${alternative}`} />)}
        </Box>
        {done && <Box direction='row' justify='center'>
          <Chart
            bounds={[[0, Object.keys(answers).length - 1], [0, totalAnswerCount]]}
            values={Object.keys(answers).map((alternative, index) => ({ value: [index, answers[alternative]], label: alternative }))}
            aria-label="chart"
            animate
          />
        </Box>}
      </Box>
    </Box>
  </>
}