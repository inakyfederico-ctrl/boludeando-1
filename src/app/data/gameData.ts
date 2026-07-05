// Datos compartidos de todos los elementos del juego

export const DEMONIC_EYES = [
  // OJOS DE IRA - Nivel 3
  { id: "ira-1-3", name: "Ojo Venganza", sin: "ira", level: 3, cost: 3, description: "Puedes consumir lentamente tus heridas o emociones y proyectar ese daño a otro. Requiere 2 turnos de preparación. Efecto: 1d3 de vida y daño." },
  { id: "ira-2-3", name: "Ojo de la Muerte Sangrienta", sin: "ira", level: 3, cost: 3, description: "Sabes instintivamente cómo herir o matar. El ojo analiza el daño mental y físico. Golpeas con ventaja + 1d4 de daño extra. También aplica a estructuras." },
  { id: "ira-3-3", name: "Ojo del Abismo", sin: "ira", level: 3, cost: 3, description: "Puedes reducir la temperatura de algo o alguien. Permite sumar frío o calor. El estado aumenta en el turno 3 y 6. Combustión en turno 10." },
  
  // OJOS DE IRA - Nivel 5
  { id: "ira-1-5", name: "Ojo de los Espíritus Vengativos", sin: "ira", level: 5, cost: 5, description: "Los espíritus persiguen al objetivo. La intensidad depende de los pecados o daño causado. El objetivo pierde toda su suerte y puede morir por accidentes." },
  { id: "ira-2-5", name: "Ojo de la Muerte Discriminada", sin: "ira", level: 5, cost: 5, description: "Infunde un miedo profundo y salvaje en el alma del objetivo con contacto visual directo. El objetivo intentará escapar, se paralizará o quedará vulnerable." },
  { id: "ira-3-5", name: "Ojo del Asesinato", sin: "ira", level: 5, cost: 5, description: "Toma el control total de una persona a través de una pantalla e internet. La víctima no recuerda nada al finalizar el control." },

  // OJOS DE IRA - Nivel 10
  { id: "ira-1-10", name: "Señor Máximo de los Dragones", sin: "ira", level: 10, cost: 10, description: "Al activar esta habilidad, te transformas en un dragón casi invulnerable y de poder titánico. Durante este estado, no puedes usar otras habilidades. Tu vida máxima se duplica. Obtienes entre 6 y 8 puntos de armadura. Tienes 3 acciones de combate por turno. Puedes usar cada una de estas acciones una vez por turno: Escupir fuego naranja en un área amplia (daño bajo). Escupir fuego azul en un objetivo concentrado (daño muy alto). Atacar con tus garras a dos objetivos diferentes o ambas garras a un solo objetivo (daño bajo). Morder a un objetivo causando daño bajo; durante el siguiente turno del objetivo, debe realizar una tirada de salvación de Fuerza para evitar quedar atrapado en tu mordida y recibir daño adicional. Acción legendaria adicional: Una vez por día, puedes reforzar una de tus acciones para anular completamente cualquier daño que vayas a recibir." },
  { id: "ira-2-10", name: "Ojo del Señor Demonio", sin: "ira", level: 10, cost: 10, description: "Pasiva: Puedes elegir auras de todos los colores. Todas tus auras de nivel 1 (T1) se convierten en nivel 2 (T2). Ganas 10 puntos de aura adicionales para distribuir libremente durante 3 horas. Puedes usar 1 o 2 auras como acción adicional. Tu energía demoníaca máxima se duplica y regeneras una cantidad fija por turno sin costo. Los efectos negativos de ciertas auras o condiciones se reducen o anulan. Nota: El uso del Láser Orbital desactiva este ojo inmediatamente y por varias horas." },

  // OJOS DE CODICIA - Nivel 3
  { id: "codicia-1-3", name: "Ojo Codicioso del Baúl", sin: "codicia", level: 3, cost: 3, description: "Tu ojo funciona como un inventario. No puedes introducir seres vivos. Puedes duplicar objetos comunes (2 copias por cooldown de 2 horas). Las vendas cuentan como vida falsa." },
  { id: "codicia-2-3", name: "Ojos de la Adulación", sin: "codicia", level: 3, cost: 3, description: "Quienes te miran te respetan y están dispuestos a darte cosas. Ventaja en tiradas sociales. Al salir del rango de influencia, son conscientes de lo que pasó." },
  { id: "codicia-3-3", name: "Ojo de la Reescritura Corporal", sin: "codicia", level: 3, cost: 3, description: "Puedes remodelar tu cuerpo o extremidades basándote en otros animales. Tardas 2 turnos en dibujarte. Dura 10 minutos. No puedes cambiar de tamaño." },

  // OJOS DE CODICIA - Nivel 5
  { id: "codicia-1-5", name: "Ojo de la Enfermedad de la Carne", sin: "codicia", level: 5, cost: 5, description: "Permite generar carne viva, tentáculos o integrar objetos inanimados al cuerpo. Crea una armadura reactiva viva con conciencia propia." },
  { id: "codicia-2-5", name: "Ojo del Deseo de Sobrealimentación", sin: "codicia", level: 5, cost: 5, description: "Invoca una copia permanente de un objetivo o artefacto (Grados 0 y 1), pero con estructura más frágil. Permite crear objetos que rompan las leyes físicas." },
  { id: "codicia-3-5", name: "Ojo de la Madre de la Colmena", sin: "codicia", level: 5, cost: 5, description: "Crea esbirros de carne. Máx 30 puntos (1 pto cada 2 min). Débil: 1 pto, Mediano: 10 ptos, Grande: 25 ptos. Al consumirlos, recuperas memoria y experiencias." },

  // OJOS DE CODICIA - Nivel 10
  { id: "codicia-1-10", name: "Ojo del Otro Mundo", sin: "codicia", level: 10, cost: 10, description: "Puedes manifestar en la realidad cualquier objeto o entidad. Estas manifestaciones se degradan rápidamente con el uso, te debilitan, consumen energía constantemente y no pueden ser tan poderosas como los ojos superiores de nivel 10 o más." },
  { id: "codicia-2-10", name: "Mil Ojos de Dios", sin: "codicia", level: 10, cost: 10, description: "Invocas numerosos ojos en cualquier superficie visible. Estos ojos no te causan molestia alguna. Puedes lanzar hechizos demoníacos o auras demoníacas a través de estos ojos (máximo 4 ojos simultáneos para lanzar habilidades). Ejemplo: Si lanzas un proyectil demoníaco, los 4 ojos seleccionados también lo lanzarán simultáneamente." },

  // OJOS DE GULA - Nivel 3
  { id: "gula-1-3", name: "Ojo del Devorador de Información", sin: "gula", level: 3, cost: 3, description: "Consumes información de libros o medios y puedes proyectarla como un holograma. Entiendes planos, pero libros complejos dan información sin comprensión necesaria." },
  { id: "gula-2-3", name: "Ojo Torpor del Tiempo", sin: "gula", level: 3, cost: 3, description: "Robas tiempo de un objetivo (se ralentiza hasta casi detenerse). Almacenas de 2 en 2 seg (máx 4 seg). Buffs: +2 Destreza, +2 Pensamiento, +1 Armadura." },
  { id: "gula-3-3", name: "Ojo de la Simbiosis", sin: "gula", level: 3, cost: 3, description: "Creas un vínculo entre personas para drenar o dar vida/energía demoníaca. El vínculo es bidireccional. No requiere consentimiento." },

  // OJOS DE GULA - Nivel 5
  { id: "gula-1-5", name: "Ojo Consumidor del Mundo", sin: "gula", level: 5, cost: 5, description: "Consume materiales para adquirir sus propiedades físicas y modificar el cuerpo. Comer cadáveres cura al usuario y otorga las memorias del difunto." },
  { id: "gula-2-5", name: "Ojo Entrópico Robavida", sin: "gula", level: 5, cost: 5, description: "Drena la vitalidad y años de vida de seres vivos y objetos. En combate: al final de cada turno, el objetivo pierde 2 PV y el usuario los recupera." },
  { id: "gula-3-5", name: "Ojo del Gusano Caminante", sin: "gula", level: 5, cost: 5, description: "Transforma el cuerpo en colonia de gusanos, insectos o slime negro. La vida se mide en Puntos de Masa. Puedes gastar 30 puntos para rearmarte instantáneamente." },

  // OJOS DE GULA - Nivel 10
  { id: "gula-1-10", name: "Los 3 Ojos de Acaparamiento", sin: "gula", level: 10, cost: 10, description: "Puedes usar tres ojos de nivel 3 de cualquier pecado simultáneamente. Puedes cambiar uno de estos ojos por turno como acción adicional. Estos ojos funcionan con ligeras mejoras y sin ciertas restricciones." },

  // OJOS DE LUJURIA - Nivel 3
  { id: "lujuria-1-3", name: "Ojo Astuto de la Obsesión", sin: "lujuria", level: 3, cost: 3, description: "El objetivo se obsesiona contigo. Debilita la influencia de otros, rompiendo su voluntad y concentración. Si se interrumpe, sentirá enojo extremo. Dura 12 horas." },
  { id: "lujuria-2-3", name: "Ojo Seductor", sin: "lujuria", level: 3, cost: 3, description: "Al mantener contacto visual, ralentizas hasta paralizar al objetivo. Combate: 2 turnos = ralentizado, 3 turnos = paralizado. Fuera de combate: 10 seg = aturdido." },
  { id: "lujuria-3-3", name: "Ojo de la Búsqueda del Placer", sin: "lujuria", level: 3, cost: 3, description: "Sobrecarga sensorial que causa espasmos y pérdida de concentración física. Atacas con +2 y el enemigo te ataca con desventaja. El objetivo no puede concentrarse." },

  // OJOS DE LUJURIA - Nivel 5
  { id: "lujuria-1-5", name: "Ojo de la Revelación de la Mente", sin: "lujuria", level: 5, cost: 5, description: "Visualiza los pensamientos y palabras de otros como objetos físicos. Permite alterarlos de forma sutil para que el objetivo crea que las ideas modificadas son propias." },
  { id: "lujuria-2-5", name: "Ojo de la Sumisión", sin: "lujuria", level: 5, cost: 5, description: "Vuelve al usuario intocable. El cuerpo del enemigo se vuelve flexible ante tu fuerza y es incapaz de causarte daño indirecto." },
  { id: "lujuria-3-5", name: "Marca del Ojo del Demonio", sin: "lujuria", level: 5, cost: 5, description: "Quema una marca en el objetivo para controlar sus acciones, sentimientos y biología menor. Permite inducir reacciones físicas e impulsos. Máx 3 marcas." },

  // OJOS DE LUJURIA - Nivel 10
  { id: "lujuria-1-10", name: "Ojo Corruptor del Pecado Demoníaco", sin: "lujuria", level: 10, cost: 10, description: "Con una mirada, puedes controlar gradualmente a un objetivo. Debes entrar en combate y golpear al objetivo para debilitar su cuerpo y mente. Puedes controlar la mente y cuerpo de hasta 3 entidades a la vez." },

  // OJOS DE PEREZA - Nivel 3
  { id: "pereza-1-3", name: "Ojos de los Sueños Perdidos", sin: "pereza", level: 3, cost: 3, description: "Siempre tienes sueños lúcidos. Al cerrar los ojos, entras en proyección astral. Ves las almas como estrellas, observas sus vidas y entras en sus sueños como espectador." },
  { id: "pereza-2-3", name: "Ojos de Mantener el Tiempo", sin: "pereza", level: 3, cost: 3, description: "Detienes el tiempo para todo. Puedes moverte hasta 13 pasos. No puedes atacar. Cooldown 15 min en campaña. Requiere tirada de Destreza ante ataques sorpresa." },
  { id: "pereza-3-3", name: "Ojo de Marionetas", sin: "pereza", level: 3, cost: 3, description: "Da vida a muñecos, proyecciones o cadáveres. Máx 2-3. Tienen la mitad de la vida original. Requiere contacto físico para activar." },

  // OJOS DE PEREZA - Nivel 5
  { id: "pereza-1-5", name: "Ojo Interno del Observador", sin: "pereza", level: 5, cost: 5, description: "Crea un mundo interior personal donde eres el rey. Nadie externo puede interactuar contigo. En peligro, puedes aparecer en el lugar seguro más cercano. Cooldown: 30 min." },
  { id: "pereza-2-5", name: "Ojo de la Conciencia del Parpadeo", sin: "pereza", level: 5, cost: 5, description: "Al cerrar los ojos, sales de la existencia y te teletransportas a cualquier lugar visible (3-4 cuadras). Genera un sonido de aplauso. +2 al ataque si lo usas para atacar." },
  { id: "pereza-3-5", name: "Ojo Falso de la Ciudad Maravilla", sin: "pereza", level: 5, cost: 5, description: "Altera las propiedades físicas del entorno (Estilo Toon Force). Puede afectar el agua, magnetismo, clima y contaminación ambiental." },

  // OJOS DE PEREZA - Nivel 10
  { id: "pereza-1-10", name: "Ojo de la Nulificación", sin: "pereza", level: 10, cost: 10, description: "Puedes ocultar tu existencia de la realidad, haciendo que todos te olviden. Puedes atravesar objetos y flotar. Recomendado usar como reacción activable por momentos para mayor fuerza." },

  // OJOS DE ORGULLO - Nivel 3
  { id: "orgullo-1-3", name: "Ojos del Viejo Hombre", sin: "orgullo", level: 3, cost: 3, description: "Ves líneas de conexión en todas las cosas. Eres un rastreador. El color de la línea indica la fuerza del vínculo con un objeto o persona." },
  { id: "orgullo-2-3", name: "Ojo de ser Presumido", sin: "orgullo", level: 3, cost: 3, description: "Con una mirada provocadora, reflejas ataques físicos o mágicos con la misma potencia. Puede copiar otros 'ojos' que hayan sido usados contra ti." },
  { id: "orgullo-3-3", name: "Ojos del Maestro Relojero", sin: "orgullo", level: 3, cost: 3, description: "Entiendes cualquier mecanismo al instante (visión 3D). Obtienes las herramientas mentales para replicarlo o mejorarlo." },

  // OJOS DE ORGULLO - Nivel 5
  { id: "orgullo-1-5", name: "Ojo de la Inmunidad Causal", sin: "orgullo", level: 5, cost: 5, description: "Al activarlo, sales del concepto de causalidad. Se anula cualquier intento de daño, así como las necesidades biológicas. Requiere activación constante y consciente." },
  { id: "orgullo-2-5", name: "Ojo de Schrödinger", sin: "orgullo", level: 5, cost: 5, description: "Permite ver todos los potenciales de acción en el rango de visión. Puedes elegir hasta 3 enemigos para predecir sus movimientos. En cuerpo a cuerpo: +1 Armadura y +2 al ataque." },
  { id: "orgullo-3-5", name: "Ojo del Shinigami", sin: "orgullo", level: 5, cost: 5, description: "Al mirar directamente a una persona, percibes las probabilidades y formas en las que esta puede morir. Es común ver múltiples destinos fatales simultáneamente." },

  // OJOS DE ORGULLO - Nivel 10
  { id: "orgullo-1-10", name: "Ojo del Pupilo Caído del Interno \"Yo\"", sin: "orgullo", level: 10, cost: 10, description: "Puedes crear 6 avatares, cada uno representando un pecado diferente, separando esas emociones de ti. Si un avatar muere, regresa a ser parte de ti. Los avatares tienen las mismas habilidades que tú." },
  { id: "orgullo-2-10", name: "Tercer Ojo de la Verdadera Pureza", sin: "orgullo", level: 10, cost: 10, description: "Puedes potenciar los ojos de nivel 3 a una fuerza equivalente a nivel 5, los de nivel 5 a nivel 10, y los de nivel 10 a nivel 15. Se recomienda limitar su uso junto con otro ojo para evitar conflictos de personalidad." },

  // OJOS DE ENVIDIA - Nivel 3
  { id: "envidia-1-3", name: "Los Ojos del Espía", sin: "envidia", level: 3, cost: 3, description: "Localización divina. Proyecta la ubicación de un enemigo (de forma indirecta). Permite ver qué hay al otro lado de una estructura y detectar enemigos cercanos." },
  { id: "envidia-2-3", name: "Ojos de las Marionetas Vivientes", sin: "envidia", level: 3, cost: 3, description: "Generas hilos para controlar las extremidades de personas vivas. Los hilos se cortan con ataques anti espirituales. Necesitas minutos de recuperación tras el uso." },
  { id: "envidia-3-3", name: "Ojos del Gran Comandante", sin: "envidia", level: 3, cost: 3, description: "Fuerzas una orden a alguien que te mire. El objetivo es consciente, pero actúa con gran habilidad. No puedes ordenar suicidio. Termina cuando el objetivo parpadea." },

  // OJOS DE ENVIDIA - Nivel 5
  { id: "envidia-1-5", name: "Ojo de la Invasión al Alma", sin: "envidia", level: 5, cost: 5, description: "Lanza un fragmento de alma que invade el cuerpo y mente del objetivo. Si el alma mata al objetivo, tomas control total del cuerpo con 1/4 de vida total." },
  { id: "envidia-2-5", name: "Ojo de la Decepción", sin: "envidia", level: 5, cost: 5, description: "Altera la percepción mutua entre dos objetivos u objetos. Puede hacer que alguien vea a un enemigo como aliado, o un veneno como bebida refrescante. La percepción es 100% real." },
  { id: "envidia-3-5", name: "Ojo del Ladrón", sin: "envidia", level: 5, cost: 5, description: "Roba o copia habilidades, atractivo y relaciones sociales. Habilidades débiles: 2 turnos. Habilidades medias: mientras el objetivo esté presente. No copia habilidades Nivel 10." },

  // OJOS DE ENVIDIA - Nivel 10
  { id: "envidia-1-10", name: "Azar del Faraón", sin: "envidia", level: 10, cost: 10, description: "Puedes capturar entidades en cartas. Las entidades son conscientes y pueden viajar dentro de la carta como si fuera su propio mundo. Las entidades no pueden escapar a menos que la carta sea destruida. Puedes invocar una representación de la criatura de la carta, pero esta invocación tendrá solo la mitad de la vida." },
];

export const DEFECTS = [
  { id: "defect-1", name: "Apaciguamiento", pointsGained: 2, auraPoints: 2, description: "Requiere un encantamiento o gesto específico para activar el poder. El ojo debe permanecer tapado mientras no esté en uso.", affectsPrice: false },
  { id: "defect-2", name: "Alucinación (El Familiar Imaginario)", pointsGained: 0, auraPoints: 0, description: "El demonio se manifiesta como un 'amigo imaginario' sobre tu hombro, ligado a su pecado. No interactúa con el mundo físico, pero sí con el espiritual. Si caes inconsciente, el familiar toma el control para llevarte a un lugar seguro.", affectsPrice: false },
  { id: "defect-3", name: "Insolación (Aislamiento Emocional)", pointsGained: 0, auraPoints: 0, description: "Incapacidad total de formar vínculos o sentir empatía por los demás. Convierte todos tus 'Puntos de Compañero' en Aura de Demonio.", affectsPrice: false },
  { id: "defect-4", name: "Limitador de Poder", pointsGained: 4, auraPoints: 0, description: "Tu cuerpo físico es incapaz de contener la energía demoníaca. Usar los poderes causa un daño interno severo (pérdida constante de mucha vida al activar habilidades).", affectsPrice: false },
  { id: "defect-5", name: "Impulso de Pecado", pointsGained: 0, auraPoints: 0, description: "Tus acciones deben estar movidas casi siempre por el pecado elegido. Permite acceder a un Tier 5 y reduce a la mitad el coste de activación de 3 'Pecados Originales' de diferentes ramas.", affectsPrice: true },
  { id: "defect-6", name: "Doble Personalidad", pointsGained: 0, auraPoints: 0, description: "En momentos de estrés, debilidad o pecado, una personalidad opuesta toma el control. Esta personalidad no te suicidará, pero cambiará el rumbo de las situaciones. Permite elegir un ojo de Nivel 3 o Nivel 5.", affectsPrice: false },
  { id: "defect-7", name: "Brazo de Demonio", pointsGained: 4, auraPoints: 2, description: "Parte de tu cuerpo está poseída. Es una carga agonizante que requiere ser 'calmada' periódicamente y tras cada uso de habilidad debido al dolor extremo. También otorga acceso a un Aura de Demonio específica.", affectsPrice: false },
  { id: "defect-8", name: "Sobreexigido", pointsGained: 6, auraPoints: 6, description: "El uso constante es imposible. El abuso del poder provoca desmayos por dolor y bloquea el uso de los ojos durante varios días.", affectsPrice: false },
  { id: "defect-9", name: "Remuneración", pointsGained: 0, auraPoints: 0, description: "Cada uso del poder conlleva una deuda o pago obligatorio hacia el demonio (sacrificio, ofrenda o acción específica). Permite elegir ojos de diferentes ramas de pecados (Multiclase).", affectsPrice: false },
  { id: "defect-10", name: "Auto-Exorcismo", pointsGained: 0, auraPoints: 0, description: "El demonio se fortalece constantemente. Para evitar que tome el control total, el usuario debe autolesionarse (quemarse o apuñalarse) para debilitarlo. Otorga 2 Artefactos Cortantes de forma gratuita.", affectsPrice: false },
  { id: "defect-11", name: "Debilitándose (Destino Marcado)", pointsGained: 30, auraPoints: 0, description: "El usuario tiene una sentencia de muerte interna. No existe forma de curarse; eventualmente sucumbirá.", affectsPrice: false },
];

export const DEMONIC_AURAS = [
  // VERDE (Tier 1 y 2)
  { id: "verde-1-tier1", name: "Arte de las Espadas Definitivas", color: "verde", tier: 1, cost: 1, clase: "Guerrero", description: "Encantas tu espada con velocidad y destreza. El arma se vuelve más suave, poderosa y veloz. Puede reflejar proyectiles. Aura: coste bajo." },
  { id: "verde-1-tier2", name: "Arte de las Espadas Definitivas II", color: "verde", tier: 2, cost: 1, clase: "Guerrero", description: "Liberas una carga que puede cortar la realidad, la carne y las almas, incluso el espacio mismo, creando portales. Puede imbuirse con energía. Habilidad: coste medio.", requiresPrevious: "verde-1-tier1" },
  { id: "verde-2-tier1", name: "Sigilo Demoníaco", color: "verde", tier: 1, cost: 1, clase: "Guerrero / Support", description: "Tu energía demoníaca funciona como combustible para el sigilo, sobrecargando agilidad y velocidad para escapar de situaciones peligrosas. También ayuda a desenmascarar enemigos y mejorar la persecución. Aura: coste bajo." },
  { id: "verde-2-tier2", name: "Sigilo Demoníaco II", color: "verde", tier: 2, cost: 1, clase: "Guerrero / Support", description: "Puedes crear: Bombas de humo, Bombas flash, Teletransporte de corto rango, Clones de sombra para señuelos o emboscadas. Habilidad: coste medio.", requiresPrevious: "verde-2-tier1" },
  { id: "verde-3-tier1", name: "Mente Encantada", color: "verde", tier: 1, cost: 1, clase: "Mago / Support", description: "Tu mente es encantada con energía demoníaca, permitiéndote: Telequinesis imprecisa, Interferir en ataques mentales, Leer de forma vaga la mente y emociones. Habilidad: coste bajo." },
  { id: "verde-3-tier2", name: "Mente Encantada II", color: "verde", tier: 2, cost: 1, clase: "Mago / Support", description: "Generas una aura constante de peligro contra seres vivos. Tu telequinesis se vuelve precisa y puedes adentrarte más profundamente en mentes y recuerdos. Aura: coste alto (tiempo mínimo de activación).", requiresPrevious: "verde-3-tier1" },
  { id: "verde-4-tier1", name: "Control Elemental", color: "verde", tier: 1, cost: 1, clase: "Guerrero / Mago", description: "Controlas los elementos puros (tierra, aire, fuego y agua) como una extensión de tu cuerpo mediante gestos. Muy versátil. Habilidad: coste bajo." },
  { id: "verde-4-tier2", name: "Control Elemental Perfecto", color: "verde", tier: 2, cost: 1, clase: "Guerrero / Mago", description: "Tu control es perfecto, permitiéndote manipular elementos refinados: Metal, Rayo, Magma, Plasma, Barro. Aura: coste alto (tiempo mínimo).", requiresPrevious: "verde-4-tier1" },
  
  // BLANCO (Tier 1 y 2)
  { id: "blanco-1-tier1", name: "Energía Luminosa", color: "blanco", tier: 1, cost: 1, clase: "Guerrero / Mago", description: "Emites y controlas energía pura de luz, lanzándola como lanzas o fuerzas luminosas. Puede evaporar ataques de espíritus o demonios débiles y crear barreras. Aura: coste bajo." },
  { id: "blanco-1-tier2", name: "Tormenta de Luz", color: "blanco", tier: 2, cost: 1, clase: "Guerrero / Mago", description: "Generas tormentas y cadenas de luz simultáneamente. La energía luminosa atraviesa armaduras y escudos, consumiendo energía equivalente. Habilidad: coste alto.", requiresPrevious: "blanco-1-tier1" },
  { id: "blanco-2-tier1", name: "Invocación Espectral", color: "blanco", tier: 1, cost: 1, clase: "Mago / Support", description: "Creas de forma ilimitada armas espectrales que disparan a tu alrededor. También invocas objetos no complejos existentes. Acción adicional. Habilidad: coste bajo (5 minutos)." },
  { id: "blanco-2-tier2", name: "Invocación Masiva", color: "blanco", tier: 2, cost: 1, clase: "Mago / Support", description: "Invocas objetos masivos y complejos: Casas completas, Vehículos, Computadoras y componentes. Habilidad: coste alto.", requiresPrevious: "blanco-2-tier1" },
  { id: "blanco-3-tier1", name: "Grimorio Mágico", color: "blanco", tier: 1, cost: 1, clase: "Mago / Support", description: "Requiere: Libro de magia. Usando tu grimorio, lanzas cantrips ilimitados con habilidades únicas desde tu sombrero. Habilidad: coste bajo." },
  { id: "blanco-3-tier2", name: "Grimorio del Arcano", color: "blanco", tier: 2, cost: 1, clase: "Mago / Support", description: "Puedes castear cualquier aura demoníaca de mago con gran concentración. Si eres interrumpido, puede explotar. ❌ No se puede copiar el LÁSER ORBITAL. Habilidad: coste alto.", requiresPrevious: "blanco-3-tier1" },
  { id: "blanco-4-tier1", name: "Luz Purificadora", color: "blanco", tier: 1, cost: 1, clase: "Mago / Support", description: "Requiere: Sigilo de la Voluntad de Dios. Puedes castear rayos y luz purificadora, muy efectiva contra fantasmas y demonios. Curas heridas menores. Habilidad: coste bajo (Máx. 2 curas leves por persona al día)." },
  { id: "blanco-4-tier2", name: "Luz Divina", color: "blanco", tier: 2, cost: 1, clase: "Mago / Support", description: "La luz divina puede curar heridas severas y desmembramientos mientras el objetivo viva. Anatema absoluto a la maldad. Habilidad: coste alto (1 vez por persona al día, cura ~50% de vida).", requiresPrevious: "blanco-4-tier1" },
  
  // ROJO (Tier 1 y 2)
  { id: "rojo-1-tier1", name: "Berserker", color: "rojo", tier: 1, cost: 1, clase: "Guerrero", description: "Al recibir daño ganas fuerza. Cuantas más heridas recibas, más poderoso eres. Pasiva." },
  { id: "rojo-1-tier2", name: "Furia Sin Límite", color: "rojo", tier: 2, cost: 1, clase: "Guerrero", description: "Entras en frenesí total, ignorando el dolor y triplicando tu fuerza. Duración: hasta que pierdas la consciencia. Aura: coste muy alto.", requiresPrevious: "rojo-1-tier1" },
  { id: "rojo-2-tier1", name: "Explosiones de Poder", color: "rojo", tier: 1, cost: 1, clase: "Mago", description: "Generas explosiones de energía. Daño de área. Habilidad: coste medio." },
  { id: "rojo-2-tier2", name: "Gran Cataclismo", color: "rojo", tier: 2, cost: 1, clase: "Mago", description: "Explosión masiva que destruye todo en un radio gigante. Habilidad: coste extremo (1 vez por día).", requiresPrevious: "rojo-2-tier1" },
  { id: "rojo-3-tier1", name: "Resistencia Demoníaca", color: "rojo", tier: 1, cost: 1, clase: "Guerrero", description: "Tu cuerpo se vuelve más resistente. +2 Armadura y resistencia al dolor. Pasiva." },
  { id: "rojo-3-tier2", name: "Armadura de Escamas Demoniacas", color: "rojo", tier: 2, cost: 1, clase: "Guerrero", description: "Tu piel se cubre de escamas oscuras. +4 Armadura. Aura: coste bajo.", requiresPrevious: "rojo-3-tier1" },
  { id: "rojo-4-tier1", name: "Invocar Armas", color: "rojo", tier: 1, cost: 1, clase: "Guerrero", description: "Puedes materializar armas cuerpo a cuerpo de energía demoníaca. Habilidad: coste bajo." },
  { id: "rojo-4-tier2", name: "Arsenal Demoníaco", color: "rojo", tier: 2, cost: 1, clase: "Guerrero", description: "Invocas múltiples armas que flotan a tu alrededor. Máx 6 armas. Habilidad: coste medio.", requiresPrevious: "rojo-4-tier1" },

  // NARANJA (Tier 1 y 2)
  { id: "naranja-1-tier1", name: "Proyectil Maldito", color: "naranja", tier: 1, cost: 1, clase: "Guerrero / Mago", description: "Tu poder maldito se manifiesta en explosiones de energía proyectil. Aura: coste bajo." },
  { id: "naranja-1-tier2", name: "Proyectil Guiado", color: "naranja", tier: 2, cost: 1, clase: "Guerrero / Mago", description: "Controlas el proyectil, permitiendo que rebote o se curve. El ataque no falla. Habilidad: coste medio.", requiresPrevious: "naranja-1-tier1" },
  { id: "naranja-2-tier1", name: "Drenaje Sobrenatural", color: "naranja", tier: 1, cost: 1, clase: "Mago / Support", description: "Inmovilizas o estrangulas a un enemigo sobrenatural, drenando su poder lentamente. Habilidad: coste medio." },
  { id: "naranja-2-tier2", name: "Sello Demoníaco", color: "naranja", tier: 2, cost: 1, clase: "Mago / Support", description: "Sellas un demonio en un objeto físico, otorgándole poder pero también una maldición. Máx. 2 objetos. Habilidad: coste alto / muy alto.", requiresPrevious: "naranja-2-tier1" },
  { id: "naranja-3-tier1", name: "Llamas Demoníacas", color: "naranja", tier: 1, cost: 1, clase: "Mago", description: "Generas llamas demoníacas o explosiones. Especialmente efectivas contra ángeles. Menor daño que un ataque normal, pero en área. Habilidad: coste bajo." },
  { id: "naranja-3-tier2", name: "Dominio del Fuego Infernal", color: "naranja", tier: 2, cost: 1, clase: "Mago", description: "Control total del fuego demoníaco: Serpientes de fuego, Esbirros ígneos. Pasiva: inmunidad al fuego demoníaco. Máx. 3 criaturas – Duración: 3 min. Habilidad: coste medio.", requiresPrevious: "naranja-3-tier1" },
  { id: "naranja-4-tier1", name: "Fuerza Demoníaca", color: "naranja", tier: 1, cost: 1, clase: "Mago", description: "Tu fuerza física aumenta enormemente, generando ondas de choque. Aura: coste bajo." },
  { id: "naranja-4-tier2", name: "Furia Creciente", color: "naranja", tier: 2, cost: 1, clase: "Mago", description: "Cuanto más combates: Más fuerte, Más rápido, Más te curas. Aura: coste bajo (estadísticas moderadas). Pasiva: estadísticas bajas constantes.", requiresPrevious: "naranja-4-tier1" },

  // NEGRO (Tier 1 y 2)
  { id: "negro-1-tier1", name: "Energía Oscura", color: "negro", tier: 1, cost: 1, clase: "Guerrero", description: "Lanzas energía oscura o sombras corruptoras (veneno). Habilidad: Bajo coste = daño bajo, Coste medio = daño mayor." },
  { id: "negro-1-tier2", name: "Dominio de las Sombras", color: "negro", tier: 2, cost: 1, clase: "Guerrero", description: "Control total de sombras: Se vuelven físicas, Invisibilidad, Control de animales y esbirros. Habilidad: coste alto (Máx. 1 animal – 17 min).", requiresPrevious: "negro-1-tier1" },
  { id: "negro-2-tier1", name: "Garra Demoníaca", color: "negro", tier: 1, cost: 1, clase: "Guerrero", description: "Requiere: Brazo demoníaco. Tu brazo se transforma en una garra demoníaca, capaz de mutar en cualquier arma natural. Aura: coste bajo." },
  { id: "negro-2-tier2", name: "Forma Demoníaca Completa", color: "negro", tier: 2, cost: 1, clase: "Guerrero", description: "Supremacía demoníaca total: Te transformas brevemente en un demonio completo. Aura: coste alto.", requiresPrevious: "negro-2-tier1" },
  { id: "negro-3-tier1", name: "Manipulación de Sangre", color: "negro", tier: 1, cost: 1, clase: "Todas", description: "Requiere: compañero con esta aura. Controlas tu propia sangre: Balas, Armas, Armadura. No consume energía, pero genera anemia acumulativa (−1 a todo excepto CA, −2, −⅓ movimiento, −3 + desventaja, no puedes usar habilidades)." },
  { id: "negro-3-tier2", name: "Control de Sangre Total", color: "negro", tier: 2, cost: 1, clase: "Todas", description: "Control preciso de la sangre ajena. Puedes sentir, manipular y convertir enemigos en vampiros.", requiresPrevious: "negro-3-tier1" },
  { id: "negro-4-tier1", name: "Ingeniero Demoníaco", color: "negro", tier: 1, cost: 1, clase: "Todas", description: "Aumento de inteligencia y ayuda demoníaca para crear: Armas simples, Vehículos, Máquinas. Aura: coste bajo." },
  { id: "negro-4-tier2", name: "Maestro Tecnomante", color: "negro", tier: 2, cost: 1, clase: "Todas", description: "Creación avanzada: Armas láser, Armaduras, Espadas de energía, Vuelo antigravedad, I.A. Habilidad: coste alto.", requiresPrevious: "negro-4-tier1" },

  // AZUL (Tier 1 y 2)
  { id: "azul-1-tier1", name: "Energía Estelar", color: "azul", tier: 1, cost: 1, clase: "Mago / Support", description: "Energía conectada a estrellas y espacio: Misiles mágicos, Espíritus lunares, Meteoritos. Habilidad: coste medio." },
  { id: "azul-1-tier2", name: "Poder Cósmico", color: "azul", tier: 2, cost: 1, clase: "Mago / Support", description: "Robas energía estelar para: Rayos orbitales, Control gravitacional, Manipulación temporal, Portales. ⚠️ Consecuencias graves tras rayo orbital. Habilidad: coste alto.", requiresPrevious: "azul-1-tier1" },
  { id: "azul-2-tier1", name: "Escudos Protectores", color: "azul", tier: 1, cost: 1, clase: "Support", description: "Escudos pequeños pero potentes para ti y aliados. Habilidad: coste medio." },
  { id: "azul-2-tier2", name: "Escudo Indestructible", color: "azul", tier: 2, cost: 1, clase: "Support", description: "Escudo indestructible que cubre un edificio entero. Entras en éxtasis y quedas inmóvil. Habilidad: coste alto.", requiresPrevious: "azul-2-tier1" },
  { id: "azul-3-tier1", name: "Visión del Futuro", color: "azul", tier: 1, cost: 1, clase: "Support", description: "Visión del futuro con orbes y creación de amuletos anti-espíritus. Máx. 2 amuletos. Aura: coste bajo / medio." },
  { id: "azul-3-tier2", name: "Amuletos Poderosos", color: "azul", tier: 2, cost: 1, clase: "Support", description: "Amuletos extremadamente poderosos: Deshabilitan auras, Destruyen espíritus, Imbuyen armas (máx. 2). Aura: coste alto.", requiresPrevious: "azul-3-tier1" },
  { id: "azul-4-tier1", name: "Fuego de Almas", color: "azul", tier: 1, cost: 1, clase: "Mago", description: "Conjuras fuego de almas, quema lento y frío. Las heridas no pueden regenerarse. Aura: coste medio." },
  { id: "azul-4-tier2", name: "Devorador de Almas", color: "azul", tier: 2, cost: 1, clase: "Mago", description: "Tomas control del esqueleto restante. El alma es consumida sin posibilidad de escape. Pasiva.", requiresPrevious: "azul-4-tier1" },
];