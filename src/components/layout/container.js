import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';


export default styled.View`
  backgroundColor: ${({ theme }) => theme.backgroundColor};
  justify-content: space-around;
  align-items: center;
  
  
`;