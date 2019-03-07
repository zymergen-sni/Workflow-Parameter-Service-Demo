
  const TestData = [
    {
      specifier: 'B0001:v1.0.2',
      version: 1,
      isDefault: true,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_001',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_002',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
      ],
    },
    {
      specifier: 'B0001_call2:W1008_call1:M7777',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_004',
            },
          ],
        },
      ],
    },
    {
      specifier: 'B0001_call1:W1008_call2:M7777',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
      ],
    },

    {
      specifier: 'E0001_call2:F1002_call1:M6677',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_004',
            },
          ],
        },
      ],
    },

    {
      specifier: 'G0001_call2:W1019_call1:M6679',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_004',
            },
          ],
        },
      ],
    },
    {
      specifier: 'C0001:v1.0.1',
      version: 1,
      isDefault: true,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_001',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_002',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
      ],
    },

    {
      specifier: 'F0001_call2:B1008_call1:A1001',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_004',
            },
          ],
        },
      ],
    },

    {
      specifier: 'B0001_call3:W1008_call2:G1022',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_004',
            },
          ],
        },
      ],
    },

    {
      specifier: 'C0001_call4:Z1008_call1:E2990',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_004',
            },
          ],
        },
      ],
    },

    {
      specifier: 'B0001_call2:W1008_call1:G2000',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_004',
            },
          ],
        },
      ],
    },

    {
      specifier: 'C0001_call2:W1008_call1:G2000',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_004',
            },
          ],
        },
      ],
    },

    {
      specifier: 'B0001_call5:C1_call1:E1029',
      version: 1,
      parameterSets: [
        {
          isDefault: true,
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_002',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_003',
            },
          ],
        },
        {
          parameterSet: [
            {
              key: 'tecanParams',
              value: 'tecan_echo_003',
            },
            {
              key: 'poolSettings',
              value: 'pooling_settings_004',
            },
          ],
        },
      ],
    },
  ];

  export default TestData;
