/**
 * A list of OpenMP directives which we will search for inside the code
 * @type {string[]}
 */
const openMPDirectives = [
    //Fortran Directives
    //Variant Directives
    '!$omp metadirective',
    '!$omp declare variant ',
    // requires directive
    '!$omp requires',
    // parallel construct
    '!$omp parallel',
    // teams construct
    '!$omp teams',
    // Worksharing constructs
    '!$omp sections',
    '!$omp single ',
    '!$omp workshare',
    '!$omp do',
    // SIMD directives
    '!$omp simd',
    '!$omp do simd',
    '!$omp declare simd',
    // distribute loop constructs
    '!$omp distribute',
    '!$omp distribute simd',
    '!$omp distribute parallel do',
    '!$omp distribute parallel do simd ',
    // loop construct
    '!$omp loop',
    // scan directive
    '!$ompscan',
    // Tasking constructs
    '!$omp task',
    '!$omp taskloop',
    '!$omp taskloop simd',
    '!$omp taskyield',
    // Memory management directive
    '!$omp allocate ',
    // Device directives and construct
    '!$omp target data',
    '$omp target enter data',
    '!$omp target exit data',
    '!$omp target',
    '!$omp target update',
    '!$omp declare target',
    // Combined constructs
    '!$omp parallel do',
    '!$omp parallel loop',
    '!$omp parallel sections',
    '!$omp parallel workshare',
    '!$omp parallel do simd',
    '!$omp parallel master',
    '!$omp master taskloop',
    '!$omp master taskloop simd',
    '!$omp parallel master taskloop',
    '!$omp parallel master taskloop simd ',
    '!$omp teams distribute',
    '!$omp teams distribute simd ',
    '!$omp teams distribute parallel do',
    '!$omp teams distribute parallel do simd',
    '!$omp teams loop',
    '!$omp target parallel ',
    '!$omp target parallel do',
    '!$omp target parallel for simd',
    '!$omp target parallel loop',
    '!$omp target simd',
    '!$omp target teams',
    '!$omp target teams distribute',
    '!$omp target teams distribute simd',
    '!$omp target teams loop',
    '!$omp target teams distribute parallel do',
    '!$omp target teams distribute parallel do simd',
    // master construct
    '!$omp master',
    // Synchronization constructs
    '!$omp critical ',
    '!$omp barrier',
    '!$omp taskgroup',
    '!$omp atomic',
    '!$omp flush',
    '!$omp ordered',
    '!$omp depobj',
    // Cancellation constructs
    '!$omp cancel',
    '!$omp cancellation point',
    // Data environment directive
    '!$omp threadprivate',
    '!$omp declare reduction',
    '!$omp declare mapper ',


    // C / C++ Directives
    // Variant Directives
    '#pragma omp metadirective',
    '#pragma omp declare variant',
    //requires directive
    '#pragma omp requires',
    // parallel construct
    '#pragma omp parallel',
    // teams construct
    '#pragma omp teams',
    //Worksharing constructs
    '#pragma omp sections',
    '#pragma omp single ',
    '#pragma omp for ',
    // SIMD directives
    '#pragma omp simd ',
    '#pragma omp for simd',
    '#pragma omp declare simd',
    // distribute loop constructs
    '#pragma omp distribute',
    '#pragma omp distribute simd',
    '#pragma omp distribute parallel for',
    '#pragma omp distribute parallel for simd ',
    // loop construct
    '#pragma omp loop',
    // scan directive
    '#pragma omp scan',
    // Tasking constructs
    '#pragma omp task',
    '#pragma omp taskloop',
    '#pragma omp taskloop simd ',
    '#pragma omp taskyield',
    // Memory management directive
    '#pragma omp allocate',
    // Device directives and construct
    '#pragma omp target data',
    '#pragma omp target enter data',
    '#pragma omp target exit data',
    '#pragma omp target',
    '#pragma omp target update',
    '#pragma omp declare target',
    // Combined constructs
    '#pragma omp parallel for',
    '#pragma omp parallel loop',
    '#pragma omp parallel sections',
    '#pragma omp parallel for simd',
    '#pragma omp parallel master',
    '#pragma omp master taskloop',
    '#pragma omp master taskloop simd',
    '#pragma omp parallel master taskloop',
    '#pragma omp parallel master taskloop simd',
    '#pragma omp teams distribute',
    '#pragma omp teams distribute simd',
    '#pragma omp teams distribute parallel for',
    '#pragma omp teams distribute parallel for simd',
    '#pragma omp teams loop',
    '#pragma omp target parallel',
    '#pragma omp target parallel for',
    '#pragma omp target parallel for simd',
    '#pragma omp target parallel loop',
    '#pragma omp target simd',
    '#pragma omp target teams',
    '#pragma omp target teams distribute',
    '#pragma omp target teams distribute simd',
    '#pragma omp target teams loop',
    '#pragma omp target teams distribute parallel for',
    '#pragma omp target teams distribute parallel for simd',
    // master construct
    '#pragma omp master',
    // Synchronization constructs
    '#pragma omp critical',
    '#pragma omp barrier',
    '#pragma omp taskgroup',
    '#pragma omp atomic',
    '#pragma omp flush',
    '#pragma omp ordered',
    '#pragma omp depobj',
    // Cancellation constructs
    '#pragma omp cancel',
    '#pragma omp cancellation point',
    // Data environment directive
    '#pragma omp threadprivate',
    '#pragma omp declare reduction',
    '#pragma omp declare mapper',

]

module.exports = openMPDirectives;





