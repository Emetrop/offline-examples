// @flow
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import RenameTodoMutation from '../mutations/RenameTodoMutation';
import TodoTextInput from './TodoTextInput';
*/
import React, { useState } from 'react';
import { View } from 'react-native';
import styled, {css} from "styled-components";
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import { CheckBox, Button, Text } from 'react-native-elements';

const StyledLabel = styled(Text)`
  text-align: center;
  flex: 1;  
`;
const StyledRemove = styled.TouchableOpacity`
  color: #af5b5e;
  background-color: white;
  text-align: center;
  height: 100%;
`;
import RenameTodoMutation from '../mutations/RenameTodoMutation';

import { withApollo } from "react-apollo";


export const Todo = ({ todo, user, disabled, client}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleCompleteChange = (complete: any) => {
    ChangeTodoStatusMutation.commit(client, complete, todo, user);
  };

  const handleDestroyClick = () => removeTodo();
  const handleLabelDoubleClick = () => {
    if(!disabled)
      setIsEditing(true);
  }
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = (text: any) => {
    setIsEditing(false);
    RenameTodoMutation.commit(client, text, todo);
  };

  const removeTodo = () => RemoveTodoMutation.commit(client, todo, user);

  return <View style={{flex: 1, flexDirection: 'row',
  justifyContent: 'center', alignItems: 'center'}}>
    <CheckBox
    containerStyle={css`border: 1px solid #e6e6e6;`}
    checkedIcon='dot-circle-o'
    uncheckedIcon='circle-o'
          checked={todo.complete}
          onPress={() => handleCompleteChange(!todo.complete)}
        />
    <StyledLabel h4 fontFamily='Helvetica' key={"todo"+ todo.id}>{todo.text}</StyledLabel>
    <Button
         onPress={handleDestroyClick}
         icon={{name: 'delete'}}
         buttonStyle={{
          backgroundColor:'white'
        }}
       >
       </Button>
  </View>;
  //return <Text key={todo.id}></Text>;
  /*const handleCompleteChange = (e: any) => {
    const complete = e.currentTarget.checked;
    ChangeTodoStatusMutation.commit(relay.environment, complete, todo, user);
  };

  
  const handleLabelDoubleClick = () => setIsEditing(true);
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = (text: string) => {
    setIsEditing(false);
    RenameTodoMutation.commit(relay.environment, text, todo);
  };

  

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"
        />

        <label onDoubleClick={handleLabelDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleDestroyClick} />
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur={true}
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );*/
};

export default withApollo(Todo);
