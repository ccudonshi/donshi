import React from 'react';
import ImgButton from './ImgButton';

export function CurriedBackToInitBtn({bottom,right}) {

    return function({ mapRef, initalRegion }) {
        console.log('render backBtn')
        const backToInit = () => mapRef.current.animateToRegion(initalRegion, 500);
        const InitBtnStyle = {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'rgba(250,250,250,0.85)',
            position: 'absolute',
            bottom: bottom || 100,
            right: right || 10,
            zIndex:99
        };
        return (
            <ImgButton
                style={InitBtnStyle}
                imgSrc={require('app/assets/flag32.png')}
                onPress={backToInit} />
        );
    }
  }

export function BackToInitBtn({ mapRef, initalRegion }) {
    const backToInit = () => mapRef.current.animateToRegion(initalRegion, 500);
    const InitBtnStyle = {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        width: 58,
        height: 58,
        borderRadius: 30,
        backgroundColor: 'rgba(250,250,250,1)',
        position: 'absolute',
        bottom: 100,
        right: 10,
    };
    return (
        <ImgButton
            style={InitBtnStyle}
            imgSrc={require('app/assets/finish.png')}
            onPress={backToInit} />
    );
}
