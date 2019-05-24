/*
Stage 2: Spear destinations - Guild Quest

@Author Lerk
*/

function act() {
								var react = rm.getPlayer().getEventInstance().getMapFactory().getMap(990000400).getReactorByName("speargate");
                               // rm.getMap().getReactorByName("statuegate").forceHitReactor(react.getState() + 1);
    rm.getPlayer().getEventInstance().getMapFactory().getMap(990000400).getReactorByName("speargate").forceHitReactor(react.getState() + 1);
}