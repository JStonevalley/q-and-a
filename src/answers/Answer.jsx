import React, { useEffect, useState } from 'react'
import { Button, Heading, Box } from 'grommet'
import { OrderedMap, fromJS } from 'immutable'
import * as firebase from 'firebase/app'
import { nanoid } from 'nanoid'
import 'firebase/database'

const GhostAlternative = () => <Box margin='small' responsive={false} style={{
  height: '0px',
  flex: '1 0 26%'
}} />

const ALTERNATIVES = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

export const Answer = ({ match: { url, params: { id }} }) => {
  const [ session, setSession ] = useState()
  const [ questions, setQuestions ] = useState()
  const [ answers, setAnswers ] = useState()
  useEffect(() => {
    localStorage.getItem('clientId') || localStorage.setItem('clientId', nanoid(32))
  }, [])
  useEffect(() => {
    if (id) {
      return firebase.database()
        .ref(`/session/${id}`)
        .on('value', (snapshot) => {
          if (snapshot && snapshot.exists()) setSession(fromJS(snapshot.val()))
          else setSession(null)
        })
    }
  }, [id])
  useEffect(() => {
    if (id) {
      return firebase.database()
        .ref(`/questions/${id}`)
        .on('value', (snapshot) => {
          if (snapshot && snapshot.exists()) setQuestions(fromJS({ ...snapshot.val() }))
        })
    }
  }, [id])
  useEffect(() => {
    if (id && session && localStorage.getItem('clientId')) {
      return firebase.database()
        .ref(`answers/${id}/${session.get('round')}/${localStorage.getItem('clientId')}`)
        .on('value', (snapshot) => {
          if (snapshot && snapshot.exists()) setAnswers(fromJS({ ...snapshot.val() }))
          else setAnswers(OrderedMap())
        })
    }
  }, [id, session])
  if (session === undefined || !questions) return null
  else if (session === null) return <Heading textAlign='center' alignSelf='center' level={1} size='small' >Waiting for session to start</Heading>
  else if (session && session.get('question') == null) return <Heading textAlign='center' alignSelf='center' level={1} size='small' >Waiting for next question</Heading>
  const submitAnswer = (answer) => {
    firebase.database().ref(`answers/${id}/${session.get('round')}/${localStorage.getItem('clientId')}/${session.get('question')}`).set(answer)
  }
  const question = questions.get(String(session.get('question')))
  return <>
    <Heading textAlign='center' alignSelf='center' level={1} size='small' >Question {session.get('question') + 1}</Heading>
    <Box direction='row' justify='center'>
      <Box width={{"max": "500px"}}>
        <Box direction='row' flex={{grow: 1}} wrap>
          {ALTERNATIVES.map((alternative) => alternative <= question.get('numberOfAlternatives')
            ? <Button
                style={{ flex: '1 0 26%' }}
                key={`alternative-${alternative}`}
                onClick={() => {
                  submitAnswer(alternative)
                }}
                primary
                label={alternative}
                margin='small'
                size='large'
                color={answers.get(String(session.get('question'))) === alternative ? 'accent-1' : undefined}
              />
            : <GhostAlternative key={`ghost-alternative-${alternative}`} />)}
        </Box>
        {/* {done && <Box direction='row' justify='center'>
          <Chart
            bounds={[[0, Object.keys(answers).length - 1], [0, totalAnswerCount]]}
            values={Object.keys(answers).map((alternative, index) => ({ value: [index, answers[alternative]], label: alternative }))}
            aria-label="chart"
            animate
          />
        </Box>} */}
      </Box>
    </Box>
  </>
}