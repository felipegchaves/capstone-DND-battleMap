<DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="searchResults">
                        {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {searchResults.map((searchResult, index) => (
                            <Draggable key={searchResult.id} draggableId={searchResult.id} index={index}>
                                {(provided) => (
                                <div
                                    className="sidebar__card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <h2>{searchResult.name}</h2>
                                    <p>{searchResult.hit_points}</p>
                                    <img className="sidebar__card--img" src={searchResult.image ? `https://www.dnd5eapi.co${searchResult.image}` : anonMonster}
                                    alt={searchResult.name}/>
                                    <button className="sidebar__card--removeBtn" onClick={() => handleRemoveCard(index)}>
                                    x
                                    </button>
                                </div>
                                )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
