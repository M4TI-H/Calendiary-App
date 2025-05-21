import { useState } from "react";
import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import * as BiIcons from 'react-icons/bi';

export default function BookmarkTag({id, name, color, icon, setSelectedBookmark, selectedBookmark, isSelected}) {
  const [tagSelected, setTagSelected] = useState(false);
  const IconComponent = BiIcons[icon];

  const selectBookmark = (bookmark) => {
    setTagSelected(!tagSelected);
    if (selectedBookmark === id){
      setSelectedBookmark(null);
    }
    else{
      setSelectedBookmark(bookmark);
    }
  }

  return(
    <Tag  h="7" onClick={() => selectBookmark(id)} display="flex" justifyContent="center"
      bg={isSelected && tagSelected && color} border="2px solid" borderColor={color}>
      <TagLeftIcon color={isSelected && tagSelected ? "#FFF" : color} as={IconComponent}/>
      <TagLabel color={isSelected && tagSelected ? "#FFF" : color} fontSize="xs" fontWeight="medium">{name}</TagLabel>
    </Tag>
  );
}
