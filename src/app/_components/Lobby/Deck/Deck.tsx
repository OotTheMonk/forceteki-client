import React from 'react';
import { Card, Box, Typography, Divider } from '@mui/material';
import { ICardData, IServerCardData } from '@/app/_components/_sharedcomponents/Cards/CardTypes';
import { useDragScroll } from '@/app/_utils/useDragScroll';
import { useGame } from '@/app/_contexts/Game.context';
import GameCard from '@/app/_components/_sharedcomponents/Cards/GameCard';
import { ILobbyUserProps } from '@/app/_components/Lobby/LobbyTypes';

const Deck: React.FC = () => {
    // Use the custom hook with horizontal or vertical scrolling as required
    const {
        containerRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = useDragScroll('vertical');
    // ------------------------STYLES------------------------//
    const cardStyle = {
        borderRadius: '1.1em',
        pt: '.8em',
        height: '90vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#00000080',
        backdropFilter: 'blur(30px)',
        overflow: 'hidden',
        '@media (max-height: 759px)': {
            height: '84vh',
        },
        '@media (max-height: 1000px)': {
            maxHeight: '85.5vh',
        },
    };

    const headerBoxStyle = {
        display: 'flex',
        height: '50px',
        width: '100%',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '0',
        zIndex: 1,
        pt: '.2em',
    };

    const titleTextStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
        color: 'white',
        ml: '.6em',
    };

    const deckSizeTextStyle = {
        fontSize: '2em',
        fontWeight: '400',
        color: 'white',
        mr: '.6em',
    };
    const dividerStyle = {
        backgroundColor: '#fff',
        mt: '.5vh',
        mb: '0.5vh',
        width: '80%',
        alignSelf: 'center',
        height: '1px',
    };
    const scrollableBoxStyleSideboard = {
        flexGrow: 1,
        height: '21%',
        minHeight: '183px',
        overflowY: 'auto',
    };
    const scrollableBoxStyle = {
        flexGrow: 1,
        overflowY: 'auto',
    };
    const mainContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1em',
        p: '1em',
        textWrap: 'wrap',
    };
    const { connectedPlayer, lobbyState, sendLobbyMessage } = useGame();
    const connectedUser = lobbyState ? lobbyState.users.find((u: ILobbyUserProps) => u.id === connectedPlayer) : null;

    // set decks for connectedUser
    const newDeck = connectedUser ? connectedUser.deck ? connectedUser.deck.deckCards || [] : [] : [];
    const sideBoard = connectedUser ? connectedUser.deck ? connectedUser.deck.sideboard || [] : [] : [];
    console.log('newDeck', newDeck);
    console.log('sideBoard', sideBoard);

    // Calculate the total counts
    const deckCount = newDeck.reduce(
        (sum: number, item: { count: number; }) => sum + (item.count || 0),
        0
    ) ?? 0;

    const sideboardCount = sideBoard.reduce(
        (sum: number, item: { count: number; }) => sum + (item.count || 0),
        0
    ) ?? 0;

    return (
        <Box sx={{ width:'100%' }}>
            <Card sx={cardStyle}>
                <Box sx={headerBoxStyle}>
                    <Typography sx={titleTextStyle}>Your Deck</Typography>
                    <Typography sx={deckSizeTextStyle}>
                        {deckCount}/50
                    </Typography>
                </Box>
                <Box
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    sx={scrollableBoxStyle}
                >
                    <Box sx={mainContainerStyle}>
                        {newDeck.map((card:IServerCardData) => (
                            <GameCard
                                key={card.card.id}
                                card={card}
                                variant={'lobby'}
                                onClick={() => sendLobbyMessage(['updateDeck','Deck', card.card.id])}
                            />
                        ))}
                    </Box>
                </Box>
                {sideBoard?.length > 0 && (
                    <>
                        <Box sx={headerBoxStyle}>
                            <Typography sx={titleTextStyle}>Sideboard</Typography>
                            <Divider sx={dividerStyle} />
                            <Typography sx={deckSizeTextStyle}>
                                {sideboardCount}/10
                            </Typography>
                        </Box>
                        <Box
                            ref={containerRef}
                            sx={scrollableBoxStyleSideboard}
                        >
                            <Box sx={mainContainerStyle}>
                                {sideBoard.map((card:IServerCardData) => (
                                    <GameCard
                                        key={card.card.id}
                                        card={card}
                                        variant={'lobby'}
                                        onClick={() => sendLobbyMessage(['updateDeck','Sideboard', card.card.id])}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </>
                )}
            </Card>
        </Box>
    );
};

export default Deck;