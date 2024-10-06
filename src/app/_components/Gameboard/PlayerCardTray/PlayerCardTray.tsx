// PlayerCardTray.tsx

import React from "react";
import Grid from "@mui/material/Grid2";
import Resources from "../_subcomponents/PlayerOpponentRows/Resources/Resources";
import DeckDiscard from "../_subcomponents/PlayerOpponentRows/DeckDiscard/DeckDiscard";
import CardActionTray from "../_subcomponents/PlayerOpponentRows/CardActionTray/CardActionTray";

const PlayerCardTray: React.FC<PlayerCardTrayProps> = ({
  participant,
  handleModalToggle,
  availableCards,
  onSelectCard,
  resourceSelection,
  setResourceSelection,
  availableResources,
  totalResources,
}) => {
  console.log("active player in player card tray", participant.type);

  return (
    <Grid container columnSpacing={1.2} sx={{ height: "20.82%" }}>
      <Grid
        size={3}
        sx={{
          backgroundColor: "purple",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          paddingLeft: "1.35%",
          paddingBottom: "1.35%",
        }}
      >
        <Resources
          availableResources={availableResources}
          totalResources={totalResources}
          activePlayer={participant.type}
          handleModalToggle={handleModalToggle}
        />
      </Grid>
      <Grid
        size={6}
        sx={{
          height: "100%",
          backgroundColor: "lightblue",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardActionTray
          activePlayer={participant.type}
          availableCards={availableCards}
          onSelectCard={onSelectCard}
          resourceSelection={resourceSelection}
          setResourceSelection={setResourceSelection}
        />
      </Grid>
      <Grid
        size={3}
        sx={{
          backgroundColor: "lightseagreen",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingRight: "1.35%",
          paddingBottom: "1.35%",
        }}
      >
        <DeckDiscard deckSize={participant.deckSize} />
      </Grid>
    </Grid>
  );
};

export default PlayerCardTray;
