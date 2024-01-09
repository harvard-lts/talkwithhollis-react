import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../Input';
import { ChangeEvent } from 'react';

describe('Input', () => {
  let onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  let onClick: () => void;
  const placeholderText = "Ask about book availability by title or topic";

  beforeEach(() => {
    onChange = jest.fn();
    onClick = jest.fn();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <Input 
        value="" 
        onChange={onChange}
        onClick={onClick} 
      />
    );

    expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();
    expect(getByLabelText('Send message')).toBeInTheDocument();
  });

  it('calls onChange handler when input changes', () => {
    const { getByPlaceholderText } = render(
      <Input
        value=""
        onChange={onChange} 
      />
    );

    fireEvent.change(getByPlaceholderText(placeholderText), {
      target: { value: 'test' }
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onClick handler when button is clicked', () => {
    const { getByLabelText } = render(
      <Input
        value=""
        onChange={onChange}
        onClick={onClick}
      />
    );
  
    fireEvent.click(getByLabelText('Send message'));
  
    expect(onClick).toHaveBeenCalledTimes(1);
  });

});
