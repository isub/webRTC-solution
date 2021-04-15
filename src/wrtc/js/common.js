
const stateEnum = Enum(
    {
        wsNotConnected:'WS is not connected',
        wsConnected:'WS is connected',
        tryLogin:'try login',
        loggedIn:'logged in',
        sentInvite:'invite is sent',
        gotInvite:'it has got invite'
    })

var g_state = stateEnum.wsNotConnected

function Enum( obj ) {
    // итоговый объект
    const newObj = {};

    // проходимся по каждому свойству переданного в функцию объекта
    for( const prop in obj )
    {
        // проверяем наличие собственного свойства у объекта
        if (obj.hasOwnProperty(prop)) {

            // помещаем в новый объект специальный примитивный тип JavaScript Symbol
            newObj[prop] = Symbol(obj[prop]);
        }
    }

    // делаем объект неизменяемым (свойства объекта нельзя будет изменить динамически)
    return Object.freeze(newObj);
}
