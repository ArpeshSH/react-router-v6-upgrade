import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react'; // fireEvent,
import Welcome from '../Welcome';

describe('Welcome Component Testing', () => {

    beforeEach(() => {
        render(<Welcome />);
    });

    it('Welcome componets renders in-correct children', () => {
        expect(screen.queryByText('null')).toBeNull();
    });

    it('Modal render correct children', () => {
        expect(screen.queryByText('Welcome to Sendinblue React BoilerPlate')).toBeTruthy();
    });

});
