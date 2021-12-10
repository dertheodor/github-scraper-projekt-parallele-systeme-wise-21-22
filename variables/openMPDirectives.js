/**
 * A list of OpenMP directives which we will search for inside the code
 * @type {RegExp[]}
 */
const openMPDirectivesFortran = [
    //Fortran Directives
    //Variant Directives
    /!\$omp metadirective/gi,
    /!\$omp declare variant /gi,
    // requires directive
    /!\$omp requires/gi,
    // parallel construct
    /!\$omp parallel/gi,
    // teams construct
    /!\$omp teams/gi,
    // Worksharing constructs
    /!\$omp sections/gi,
    /!\$omp single /gi,
    /!\$omp workshare/gi,
    /!\$omp do/gi,
    // SIMD directives
    /!\$omp simd/gi,
    /!\$omp do simd/gi,
    /!\$omp declare simd/gi,
    // distribute loop constructs
    /!\$omp distribute/gi,
    /!\$omp distribute simd/gi,
    /!\$omp distribute parallel do/gi,
    /!\$omp distribute parallel do simd /gi,
    // loop construct
    /!\$omp loop/gi,
    // scan directive
    /!\$omp scan/gi,
    // Tasking constructs
    /!\$omp task/gi,
    /!\$omp taskloop/gi,
    /!\$omp taskloop simd/gi,
    /!\$omp taskyield/gi,
    // Memory management directive
    /!\$omp allocate /gi,
    // Device directives and construct
    /!\$omp target data/gi,
    /!\$omp target enter data/gi,
    /!\$omp target exit data/gi,
    /!\$omp target/gi,
    /!\$omp target update/gi,
    /!\$omp declare target/gi,
    // Combined constructs
    /!\$omp parallel do/gi,
    /!\$omp parallel loop/gi,
    /!\$omp parallel sections/gi,
    /!\$omp parallel workshare/gi,
    /!\$omp parallel do simd/gi,
    /!\$omp parallel master/gi,
    /!\$omp master taskloop/gi,
    /!\$omp master taskloop simd/gi,
    /!\$omp parallel master taskloop/gi,
    /!\$omp parallel master taskloop simd/gi,
    /!\$omp teams distribute/gi,
    /!\$omp teams distribute simd /gi,
    /!\$omp teams distribute parallel do/gi,
    /!\$omp teams distribute parallel do simd/gi,
    /!\$omp teams loop/gi,
    /!\$omp target parallel /gi,
    /!\$omp target parallel do/gi,
    /!\$omp target parallel for simd/gi,
    /!\$omp target parallel loop/gi,
    /!\$omp target simd/gi,
    /!\$omp target teams/gi,
    /!\$omp target teams distribute/gi,
    /!\$omp target teams distribute simd/gi,
    /!\$omp target teams loop/gi,
    /!\$omp target teams distribute parallel do/gi,
    /!\$omp target teams distribute parallel do simd/gi,
    // master construct
    /!\$omp master/gi,
    // Synchronization constructs
    /!\$omp critical/gi,
    /!\$omp barrier/gi,
    /!\$omp taskgroup/gi,
    /!\$omp atomic/gi,
    /!\$omp flush/gi,
    /!\$omp ordered/gi,
    /!\$omp depobj/gi,
    // Cancellation constructs
    /!\$omp cancel/gi,
    /!\$omp cancellation point/gi,
    // Data environment directive
    /!\$omp threadprivate/gi,
    /!\$omp declare reduction/gi,
    /!\$omp declare mapper/gi,
]

const openMPDirectivesC = [
    // C / C++ Directives
    // Variant Directives
    /#pragma omp metadirective/gi,
    /#pragma omp declare variant/gi,
    //requires directive
    /#pragma omp requires/gi,
    // parallel construct
    /#pragma omp parallel/gi,
    // teams construct
    /#pragma omp teams/gi,
    //Worksharing constructs
    /#pragma omp sections/gi,
    /#pragma omp single /gi,
    /#pragma omp for /gi,
    // SIMD directives
    /#pragma omp simd /gi,
    /#pragma omp for simd/gi,
    /#pragma omp declare simd/gi,
    // distribute loop constructs
    /#pragma omp distribute/gi,
    /#pragma omp distribute simd/gi,
    /#pragma omp distribute parallel for/gi,
    /#pragma omp distribute parallel for simd/gi,
    // loop construct
    /#pragma omp loop/gi,
    // scan directive
    /#pragma omp scan/gi,
    // Tasking constructs
    /#pragma omp task/gi,
    /#pragma omp taskloop/gi,
    /#pragma omp taskloop simd /gi,
    /#pragma omp taskyield/gi,
    // Memory management directive
    /#pragma omp allocate/gi,
    // Device directives and construct
    /#pragma omp target data/gi,
    /#pragma omp target enter data/gi,
    /#pragma omp target exit data/gi,
    /#pragma omp target/gi,
    /#pragma omp target update/gi,
    /#pragma omp declare target/gi,
    // Combined constructs
    /#pragma omp parallel for/gi,
    /#pragma omp parallel loop/gi,
    /#pragma omp parallel sections/gi,
    /#pragma omp parallel for simd/gi,
    /#pragma omp parallel master/gi,
    /#pragma omp master taskloop/gi,
    /#pragma omp master taskloop simd/gi,
    /#pragma omp parallel master taskloop/gi,
    /#pragma omp parallel master taskloop simd/gi,
    /#pragma omp teams distribute/gi,
    /#pragma omp teams distribute simd/gi,
    /#pragma omp teams distribute parallel for/gi,
    /#pragma omp teams distribute parallel for simd/gi,
    /#pragma omp teams loop/gi,
    /#pragma omp target parallel/gi,
    /#pragma omp target parallel for/gi,
    /#pragma omp target parallel for simd/gi,
    /#pragma omp target parallel loop/gi,
    /#pragma omp target simd/gi,
    /#pragma omp target teams/gi,
    /#pragma omp target teams distribute/gi,
    /#pragma omp target teams distribute simd/gi,
    /#pragma omp target teams loop/gi,
    /#pragma omp target teams distribute parallel for/gi,
    /#pragma omp target teams distribute parallel for simd/gi,
    // master construct
    /#pragma omp master/gi,
    // Synchronization constructs
    /#pragma omp critical/gi,
    /#pragma omp barrier/gi,
    /#pragma omp taskgroup/gi,
    /#pragma omp atomic/gi,
    /#pragma omp flush/gi,
    /#pragma omp ordered/gi,
    /#pragma omp depobj/gi,
    // Cancellation constructs
    /#pragma omp cancel/gi,
    /#pragma omp cancellation point/gi,
    // Data environment directive
    /#pragma omp threadprivate/gi,
    /#pragma omp declare reduction/gi,
    /#pragma omp declare mapper/gi,
]

module.exports = {
    openMPDirectivesFortran,
    openMPDirectivesC
};
