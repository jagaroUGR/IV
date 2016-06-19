#Sesion 2. Desarrollo basado en pruebas.

En esta sesión empezamos poniendo en marcha un entorno virtual para desarrollo. El entorno elegido es **nvm** que permite variar la versión de *node.js*

![](imgs/nvm.png)

Con ella es muy simple conseguir los entornos.

![](imgs/nvm2.png)

Para poder usar uno simplemente ejecutamos el siguiente comando

![](imgs/nvm3.png)


###Desarrollo aplicación "Ranking empresas "

Para el desarrollo se ha usado *express-generator* con la que desplegamos la aplicación *node js*. Dicha aplicación se ha usado en diferentes versiones y **solo funcionaba en la v.5.0**.


A continuación se muestran capturas de la aplicación.

![](imgs/app1.png)

![](imgs/app2.png)

![](imgs/app3.png)

![](imgs/app4.png)

![](imgs/app5.png)

Este programa hace uso de **SQLite3** que se instala con **npm install**. Para que se pueda obtener de forma automática a partir de este momento hay que incluir la dependencia de *sqlite3* en el archivo **package.json**

Para ello usamos la orden de instalar pero añadiendo el parámetro *save*

![](imgs/package1.png)
