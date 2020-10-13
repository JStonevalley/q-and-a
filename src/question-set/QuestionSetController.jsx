import React, { useEffect, useState } from 'react'
import { Button, Heading, Box, Select, FormField } from 'grommet'
import { OrderedMap, Map } from 'immutable'

const ALTERNATIVES = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]

export const QuestionSetController = () => {
  const [ questions, setQuestions ] = useState(OrderedMap())
  console.log(questions.toJS())
  return <>
    <Heading textAlign='center' alignSelf='center' level={1} size='medium' >Questions</Heading>
    <Box direction='row' justify='center'>
      <Box width={{"max": "500px"}} pad={{ horizontal: 'small'}}>
        {questions.map((question, key) => <Box key={`question-${key}`} align='start'>
          <Heading level={2} size='small' margin={{ horizontal: 'small' }}>Question {key}</Heading>
          <Box direction='row' align='center'>
            <FormField label='Alternatives' margin={{ horizontal: 'small' }}>
              <Select
                options={ALTERNATIVES}
                value={question.get('numberOfAlternatives')}
                onChange={({ option }) => setQuestions(questions.setIn([key, 'numberOfAlternatives'], option))}
                size='small'
              />
            </FormField>
            <FormField label='Answer' margin={{ horizontal: 'small' }}>
              <Select
                options={ALTERNATIVES.slice(0, question.get('numberOfAlternatives'))}
                value={question.get('answer')}
                onChange={({ option }) => setQuestions(questions.setIn([key, 'answer'], option))}
                size='small'
              />
            </FormField>
          </Box>
        </Box>).toList().toArray()}
        <Button label='Add question'onClick={() => setQuestions(questions.set(Number(questions.keySeq().last('0')) + 1, Map({ numberOfAlternatives: 1 })))} margin={{ vertical: 'medium'}} />
      </Box>
    </Box>
  </>
}