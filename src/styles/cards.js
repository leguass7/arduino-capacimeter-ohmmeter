import styled from 'styled-components'

export const ListCards = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  margin: 0 auto;
  padding: 4px;
  z-index: 100;
`
export const ItemCard = styled.div`
  display: block;
  padding: 2px;
`
export const CardContainer = styled.div`
  display: block;
  padding: 10px;
  border: 0;
  border-radius: 4px;
  background-color: rgba(80, 80, 80, 1);
  box-shadow: rgba(0, 0, 0, 0.7) 1px 1px 2px;
`

export const DisplayContainer = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  padding: 0;
  background-color: rgba(0, 0, 0, 1);
  height: 80px;
  min-width: 160px;
  font-family: Digital7, Digiface;
  font-size: 72px;
  overflow: hidden;
  box-shadow: inset rgba(100, 100, 100, 0.7) 1px 1px 2px;
`

export const Display = styled.div`
  display: block;
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  padding: 0 4px;
  color: rgba(31, 153, 253, 1);
  height: 80px;
  max-width: 100%;
  width: 100%;
  text-shadow: rgba(50, 160, 255, 1) 0 0 3px;
  text-align: right;
`
export const DisplayBack = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0 4px;
  color: rgba(40, 40, 40, 0.3);
  max-width: 100%;
  width: 100%;
  height: 80px;
  text-align: right;
`
