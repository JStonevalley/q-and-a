import React, { useEffect, useState } from 'react'
import { Button, Heading, Box } from 'grommet'
import { Map, fromJS } from 'immutable'
import * as firebase from 'firebase/app'
import 'firebase/database'

export const QuestionSessionController = ({ match: { url, params: { id, round }}, history }) => {
  const [ questions, setQuestions ] = useState()
  const [ answers, setAnswers ] = useState()
  const [ session, _setSession ] = useState()
  useEffect(() => {
    if (id) {
      return firebase.database()
        .ref(`/questions/${id}`)
        .on('value', (snapshot) => {
          if (snapshot.exists()) setQuestions(fromJS({ ...snapshot.val() }))
        })
    }
  }, [history, id])
  useEffect(() => {
    if (id) {
      return firebase.database()
        .ref(`/session/${id}`)
        .on('value', (snapshot) => {
          if (snapshot && snapshot.exists()) _setSession(fromJS(snapshot.val()))
          else _setSession(undefined)
        })
    }
  }, [history, id])
  useEffect(() => {
    if (id) {
      return firebase.database()
        .ref(`/answers/${id}`)
        .on('value', (snapshot) => {
          if (snapshot && snapshot.exists()) setAnswers(fromJS({ ...snapshot.val() }))
          else setAnswers(Map())
        })
    }
  }, [history, id])
  const setSession = (session) => {
    firebase.database().ref(`session/${id}`).set(session.toJS())
  }
  const lastQuestion = (session && session.get('lastQuestion') != null) ? session.get('lastQuestion') : -1
  return <>
    <Heading textAlign='center' alignSelf='center' level={1} size='medium' >{questions ? `Session ${id}` : 'No questions for this id :('}</Heading>
    {id && questions && answers && <Box direction='row' justify='center'>
      <Box width={{"max": "500px"}} pad={{ horizontal: 'small' }}>
        {!session && <Button label='Start session' onClick={() => setSession(Map({ round: answers.size }))} />}
        {session && session.get('question') == null && <Button
          label={`Start question ${lastQuestion + 2}`}
          onClick={() => setSession(
            session
              .set('lastQuestion', lastQuestion + 1)
              .set('question', lastQuestion + 1)
          )}
          margin={{ vertical: 'medium'}}
        />}
        {session && session.get('question') != null && <Button
          label={`End question ${session.get('question') + 1}`}
          onClick={() => setSession(session.delete('question'))}
          margin={{ vertical: 'medium'}}
        />}
        {session && <Button label='End session' onClick={() => firebase.database().ref(`session/${id}`).remove()} />}
      </Box>
    </Box>}
  </>
}